import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Share, ExternalLink, ChevronUp, ChevronDown, Copy } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import { Skeleton } from '@/app/components/ui/skeleton';
import Image from 'next/image';
import { HistoricalEvent, getEventsForToday, getAllEvents, EventCategory } from "@/app/lib/history-data";
import { toast } from "sonner";

const CATEGORY_COLORS: Record<EventCategory, string> = {
  'debut': '#9747FF', // Purple
  'release': '#0082FF', // Blue
  'award': '#FFDE00', // Yellow
  'performance': '#FF7A00', // Orange
  'milestone': '#00B884', // Teal
  'vlive': '#FF3B30', // Red
  'other': '#747474', // Gray
  'military': '#2E6D25'  // Army Green
}

const CATEGORY_LABELS: Record<EventCategory, string> = {
  'debut': 'Debut',
  'release': 'Music Release',
  'award': 'Award',
  'performance': 'Performance',
  'milestone': 'Milestone',
  'vlive': 'V LIVE',
  'other': 'Other',
  'military': 'Military Service'
} 
