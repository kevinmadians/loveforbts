import { supabase, type SupabaseMessage, type SupabaseHeartCount, type SupabaseArmyStory, type SupabaseStoryComment, type SupabaseMessageComment, type SupabaseMessageLike, type SupabaseStoryLike } from './supabase'
import { format, addDays } from 'date-fns'
import { nanoid } from 'nanoid'

/**
 * Save a user message to Supabase without expiration
 */
export async function saveMessage(name: string, country: string, message: string): Promise<SupabaseMessage | null> {
  try {
    const now = new Date()
    const message_id = nanoid(10) // Generate a unique string ID for the message
    
    const { data, error } = await supabase
      .from('messages')
      .insert([
        { 
          message_id,
          name, 
          country, 
          message, 
          created_at: now.toISOString(),
          // No longer set an expiration date
          expires_at: null
        }
      ])
      .select()
      .single()
    
    if (error) {
      console.error('Error saving message:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error in saveMessage:', error)
    return null
  }
}

/**
 * Get all messages (no longer filtering by expiration)
 */
export async function getMessages(): Promise<SupabaseMessage[]> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      // Remove the expiration filter
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching messages:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error in getMessages:', error)
    return []
  }
}

/**
 * Save an ARMY story to Supabase
 */
export async function saveArmyStory(
  name: string, 
  country: string, 
  bias: string, 
  content: string,
  title?: string,
  army_since: number = 2013
): Promise<SupabaseArmyStory | null> {
  try {
    const now = new Date()
    const story_id = nanoid(10) // Generate a unique ID for the story
    
    // Generate default title if none provided
    const finalTitle = title?.trim() ? title : `${name}'s ARMY Story`;
    
    const { data, error } = await supabase
      .from('army_stories')
      .insert([
        { 
          story_id,
          name, 
          country, 
          bias, 
          content,
          title: finalTitle,
          army_since,
          created_at: now.toISOString(),
          updated_at: now.toISOString()
        }
      ])
      .select()
      .single()
    
    if (error) {
      console.error('Error saving ARMY story:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error in saveArmyStory:', error)
    return null
  }
}

/**
 * Get all ARMY stories
 */
export async function getArmyStories(page: number = 1, pageSize: number = 10): Promise<{ data: SupabaseArmyStory[], total: number }> {
  try {
    // Get total count first
    const { count, error: countError } = await supabase
      .from('army_stories')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error counting ARMY stories:', countError);
      return { data: [], total: 0 };
    }
    
    // Calculate pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    // Get paginated data
    const { data, error } = await supabase
      .from('army_stories')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) {
      console.error('Error fetching ARMY stories:', error);
      return { data: [], total: 0 };
    }
    
    return { data: data || [], total: count || 0 };
  } catch (error) {
    console.error('Error in getArmyStories:', error);
    return { data: [], total: 0 };
  }
}

/**
 * Get a single ARMY story by ID
 */
export async function getArmyStoryById(storyId: string): Promise<SupabaseArmyStory | null> {
  try {
    const { data, error } = await supabase
      .from('army_stories')
      .select('*')
      .eq('story_id', storyId)
      .single()
    
    if (error) {
      console.error('Error fetching ARMY story:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error in getArmyStoryById:', error)
    return null
  }
}

/**
 * Search ARMY stories by content or name
 */
export async function searchArmyStories(query: string, page: number = 1, pageSize: number = 10): Promise<{ data: SupabaseArmyStory[], total: number }> {
  try {
    // Get total count first
    const { count, error: countError } = await supabase
      .from('army_stories')
      .select('*', { count: 'exact', head: true })
      .or(`content.ilike.%${query}%,name.ilike.%${query}%,title.ilike.%${query}%`);
    
    if (countError) {
      console.error('Error counting search results:', countError);
      return { data: [], total: 0 };
    }
    
    // Calculate pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    // Get paginated data
    const { data, error } = await supabase
      .from('army_stories')
      .select('*')
      .or(`content.ilike.%${query}%,name.ilike.%${query}%,title.ilike.%${query}%`)
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) {
      console.error('Error searching ARMY stories:', error);
      return { data: [], total: 0 };
    }
    
    return { data: data || [], total: count || 0 };
  } catch (error) {
    console.error('Error in searchArmyStories:', error);
    return { data: [], total: 0 };
  }
}

/**
 * Initialize or update heart clicks for today
 */
export async function updateHeartClicks(): Promise<{ today: number, total: number }> {
  try {
    const today = format(new Date(), 'yyyy-MM-dd')
    
    // First, check if we have an entry for today
    const { data: existingData } = await supabase
      .from('heart_clicks')
      .select('*')
      .eq('date', today)
      .single()
    
    if (existingData) {
      // Update existing record
      const { data } = await supabase
        .from('heart_clicks')
        .update({ 
          today_clicks: existingData.today_clicks + 1,
          total_clicks: existingData.total_clicks + 1 
        })
        .eq('id', existingData.id)
        .select()
        .single()
        
      return { 
        today: data?.today_clicks || 0, 
        total: data?.total_clicks || 0 
      }
    } else {
      // Get the total clicks so far
      const { data: totalData } = await supabase
        .from('heart_clicks')
        .select('total_clicks')
        .order('id', { ascending: false })
        .limit(1)
        .single()
        
      const previousTotal = totalData?.total_clicks || 0
      
      // Create new record for today
      const { data } = await supabase
        .from('heart_clicks')
        .insert([
          { 
            date: today,
            today_clicks: 1,
            total_clicks: previousTotal + 1
          }
        ])
        .select()
        .single()
        
      return { 
        today: data?.today_clicks || 1, 
        total: data?.total_clicks || previousTotal + 1 
      }
    }
  } catch (error) {
    console.error('Error updating heart clicks:', error)
    return { today: 0, total: 0 }
  }
}

/**
 * Get the current heart click counts
 */
export async function getHeartClicks(): Promise<{ today: number, total: number }> {
  try {
    const today = format(new Date(), 'yyyy-MM-dd')
    
    // Get today's clicks
    const { data: todayData } = await supabase
      .from('heart_clicks')
      .select('today_clicks')
      .eq('date', today)
      .single()
    
    // Get total clicks 
    const { data: totalData } = await supabase
      .from('heart_clicks')
      .select('total_clicks')
      .order('id', { ascending: false })
      .limit(1)
      .single()
    
    return {
      today: todayData?.today_clicks || 0,
      total: totalData?.total_clicks || 0
    }
  } catch (error) {
    console.error('Error getting heart clicks:', error)
    return { today: 0, total: 0 }
  }
}

/**
 * We no longer need to clean up expired messages since they don't expire
 */
export function setupMessageCleanup(): void {
  // No need to run a cleanup function anymore
  // This function is kept for compatibility but doesn't do anything
}

/**
 * Get messages with pagination
 */
export async function getPaginatedMessages(page: number = 1, pageSize: number = 10): Promise<{ data: SupabaseMessage[], total: number }> {
  try {
    // Get total count first
    const { count, error: countError } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error counting messages:', countError);
      return { data: [], total: 0 };
    }
    
    // Calculate pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    // Get paginated data
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) {
      console.error('Error fetching paginated messages:', error);
      return { data: [], total: 0 };
    }
    
    return { data: data || [], total: count || 0 };
  } catch (error) {
    console.error('Error in getPaginatedMessages:', error);
    return { data: [], total: 0 };
  }
}

/**
 * Search messages by content, name, or country
 */
export async function searchMessages(query: string, page: number = 1, pageSize: number = 10): Promise<{ data: SupabaseMessage[], total: number }> {
  try {
    // Get total count first
    const { count, error: countError } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .or(`message.ilike.%${query}%,name.ilike.%${query}%,country.ilike.%${query}%`);
    
    if (countError) {
      console.error('Error counting search results:', countError);
      return { data: [], total: 0 };
    }
    
    // Calculate pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    // Get paginated data
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`message.ilike.%${query}%,name.ilike.%${query}%,country.ilike.%${query}%`)
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) {
      console.error('Error searching messages:', error);
      return { data: [], total: 0 };
    }
    
    return { data: data || [], total: count || 0 };
  } catch (error) {
    console.error('Error in searchMessages:', error);
    return { data: [], total: 0 };
  }
}

/**
 * Save a comment on an ARMY story
 */
export async function saveStoryComment(
  storyId: string,
  name: string,
  country: string,
  message: string
): Promise<SupabaseStoryComment | null> {
  try {
    const now = new Date()
    
    const { data, error } = await supabase
      .from('story_comments')
      .insert([
        { 
          story_id: storyId,
          name, 
          country, 
          message, 
          created_at: now.toISOString(),
        }
      ])
      .select()
      .single()
    
    if (error) {
      console.error('Error saving story comment:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error in saveStoryComment:', error)
    return null
  }
}

/**
 * Get all comments for a specific ARMY story
 */
export async function getStoryComments(storyId: string): Promise<SupabaseStoryComment[]> {
  try {
    const { data, error } = await supabase
      .from('story_comments')
      .select('*')
      .eq('story_id', storyId)
      .order('created_at', { ascending: true })
    
    if (error) {
      console.error('Error fetching story comments:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error in getStoryComments:', error)
    return []
  }
}

/**
 * Save a comment on a message
 */
export async function saveMessageComment(
  messageId: number,
  name: string,
  country: string,
  message: string
): Promise<SupabaseMessageComment | null> {
  try {
    const now = new Date()
    
    const { data, error } = await supabase
      .from('message_comments')
      .insert([
        { 
          message_id: messageId,
          name, 
          country, 
          message, 
          created_at: now.toISOString(),
        }
      ])
      .select()
      .single()
    
    if (error) {
      console.error('Error saving message comment:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error in saveMessageComment:', error)
    return null
  }
}

/**
 * Get all comments for a specific message
 */
export async function getMessageComments(messageId: number): Promise<SupabaseMessageComment[]> {
  try {
    const { data, error } = await supabase
      .from('message_comments')
      .select('*')
      .eq('message_id', messageId)
      .order('created_at', { ascending: true })
    
    if (error) {
      console.error('Error fetching message comments:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error in getMessageComments:', error)
    return []
  }
}

export async function getMessageByMessageId(message_id: string): Promise<SupabaseMessage | null> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('message_id', message_id)
      .single();
    if (error) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

/**
 * Helper function to get user's IP address and session identifier
 */
function getUserIdentifier(): { userIp: string; userSession: string } {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    // Return default values for server-side rendering
    return { userIp: 'server', userSession: 'server' };
  }
  
  // Get IP address (for client-side, we'll use a simple hash of navigator info)
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const platform = navigator.platform;
  const userIp = btoa(`${userAgent}-${language}-${platform}`).substring(0, 32);
  
  // Get or create session identifier
  let userSession = localStorage.getItem('love_session_id');
  if (!userSession) {
    userSession = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('love_session_id', userSession);
  }
  
  return { userIp, userSession };
}

/**
 * Like a message
 */
export async function likeMessage(messageId: string): Promise<{ success: boolean; likeCount: number; isLiked: boolean }> {
  try {
    const { userIp, userSession } = getUserIdentifier();
    console.log(`likeMessage: Starting for messageId=${messageId}, userIp=${userIp}, userSession=${userSession}`);
    
    // Check if user already liked this message
    const { data: existingLike, error: checkError } = await supabase
      .from('message_likes')
      .select('id')
      .eq('message_id', messageId)
      .eq('user_ip', userIp)
      .eq('user_session', userSession)
      .maybeSingle();
    
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing like:', checkError.message || checkError.code || 'Database tables may not exist. Please run the SQL schema first.');
      return { success: false, likeCount: 0, isLiked: false };
    }
    
    console.log(`likeMessage: existingLike found:`, existingLike);
    
    if (existingLike) {
      // Unlike the message
      console.log(`likeMessage: Unliking message ${messageId}`);
    } else {
      // Like the message  
      console.log(`likeMessage: Liking message ${messageId}`);
    }
    
    if (existingLike) {
      // Unlike the message
      const { error: deleteError } = await supabase
        .from('message_likes')
        .delete()
        .eq('id', existingLike.id);
      
      if (deleteError) {
        console.error('Error unliking message:', deleteError);
        return { success: false, likeCount: 0, isLiked: true };
      }
    } else {
      // Like the message
      const { error: insertError } = await supabase
        .from('message_likes')
        .insert([
          {
            message_id: messageId,
            user_ip: userIp,
            user_session: userSession
          }
        ]);
      
      if (insertError) {
        console.error('Error liking message:', insertError);
        return { success: false, likeCount: 0, isLiked: false };
      }
    }
    
    // Get updated like count
    const { data: messageData, error: messageError } = await supabase
      .from('messages')
      .select('like_count')
      .eq('message_id', messageId)
      .single();
    
    if (messageError) {
      console.error('Error getting message like count:', messageError);
      return { success: false, likeCount: 0, isLiked: !existingLike };
    }
    
    const result = {
      success: true,
      likeCount: messageData.like_count || 0,
      isLiked: !existingLike
    };
    
    console.log(`likeMessage: Returning result:`, result);
    return result;
  } catch (error) {
    console.error('Error in likeMessage:', error);
    return { success: false, likeCount: 0, isLiked: false };
  }
}

/**
 * Like a story
 */
export async function likeStory(storyId: string): Promise<{ success: boolean; likeCount: number; isLiked: boolean }> {
  try {
    const { userIp, userSession } = getUserIdentifier();
    
    // Check if user already liked this story
    const { data: existingLike, error: checkError } = await supabase
      .from('story_likes')
      .select('id')
      .eq('story_id', storyId)
      .eq('user_ip', userIp)
      .eq('user_session', userSession)
      .maybeSingle();
    
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing like:', checkError.message || checkError.code || 'Database tables may not exist. Please run the SQL schema first.');
      return { success: false, likeCount: 0, isLiked: false };
    }
    
    if (existingLike) {
      // Unlike the story
      const { error: deleteError } = await supabase
        .from('story_likes')
        .delete()
        .eq('id', existingLike.id);
      
      if (deleteError) {
        console.error('Error unliking story:', deleteError);
        return { success: false, likeCount: 0, isLiked: true };
      }
    } else {
      // Like the story
      const { error: insertError } = await supabase
        .from('story_likes')
        .insert([
          {
            story_id: storyId,
            user_ip: userIp,
            user_session: userSession
          }
        ]);
      
      if (insertError) {
        console.error('Error liking story:', insertError);
        return { success: false, likeCount: 0, isLiked: false };
      }
    }
    
    // Get updated like count
    const { data: storyData, error: storyError } = await supabase
      .from('army_stories')
      .select('like_count')
      .eq('story_id', storyId)
      .single();
    
    if (storyError) {
      console.error('Error getting story like count:', storyError);
      return { success: false, likeCount: 0, isLiked: !existingLike };
    }
    
    return {
      success: true,
      likeCount: storyData.like_count || 0,
      isLiked: !existingLike
    };
  } catch (error) {
    console.error('Error in likeStory:', error);
    return { success: false, likeCount: 0, isLiked: false };
  }
}

/**
 * Check if user has liked a message
 */
export async function hasUserLikedMessage(messageId: string): Promise<boolean> {
  try {
    const { userIp, userSession } = getUserIdentifier();
    
    const { data, error } = await supabase
      .from('message_likes')
      .select('id')
      .eq('message_id', messageId)
      .eq('user_ip', userIp)
      .eq('user_session', userSession)
      .maybeSingle();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error checking message like status:', error.message || error.code || 'Database tables may not exist. Please run the SQL schema first.');
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error in hasUserLikedMessage:', error);
    return false;
  }
}

/**
 * Check if user has liked a story
 */
export async function hasUserLikedStory(storyId: string): Promise<boolean> {
  try {
    const { userIp, userSession } = getUserIdentifier();
    
    const { data, error } = await supabase
      .from('story_likes')
      .select('id')
      .eq('story_id', storyId)
      .eq('user_ip', userIp)
      .eq('user_session', userSession)
      .maybeSingle();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error checking story like status:', error.message || error.code || 'Database tables may not exist. Please run the SQL schema first.');
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error in hasUserLikedStory:', error);
    return false;
  }
}

/**
 * Get featured messages (most liked)
 */
export async function getFeaturedMessages(limit: number = 5): Promise<SupabaseMessage[]> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('is_featured', true)
      .order('like_count', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching featured messages:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getFeaturedMessages:', error);
    return [];
  }
}

/**
 * Get featured stories (most liked)
 */
export async function getFeaturedStories(limit: number = 5): Promise<SupabaseArmyStory[]> {
  try {
    const { data, error } = await supabase
      .from('army_stories')
      .select('*')
      .eq('is_featured', true)
      .order('like_count', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching featured stories:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getFeaturedStories:', error);
    return [];
  }
} 