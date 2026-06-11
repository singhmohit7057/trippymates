export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  created_at: string;
}

export interface Captain {
  id: string;
  user_id: string;
  name: string;
  photo_url?: string;
  country: string;
  city: string;
  languages: string[];
  expertise: string[];
  rating: number;
  review_count: number;
  hourly_rate: number;
  availability: 'available' | 'busy' | 'offline';
  bio: string;
  verified: boolean;
  category: 'adventure' | 'luxury' | 'cultural' | 'food' | 'budget' | 'nature' | 'trekking';
  created_at: string;
}

export interface Trip {
  id: string;
  title: string;
  slug: string;
  destination: string;
  country: string;
  image_url: string;
  duration_days: number;
  price_per_person: number;
  max_travelers: number;
  current_travelers: number;
  start_date: string;
  end_date: string;
  type: 'domestic' | 'international' | 'corporate';
  category: string;
  rating: number;
  review_count: number;
  available_captains: number;
  description: string;
  highlights: string[];
  inclusions: string[];
  created_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  trip_id: string;
  trip?: Trip;
  travelers: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  booking_date: string;
  created_at: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  destination: string;
  member_count: number;
  post_count: number;
  image_url?: string;
  category: string;
  trending: boolean;
  created_at: string;
}

export interface CustomTripEnquiry {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  destination: string;
  start_date: string;
  end_date: string;
  travelers: number;
  budget_range: string;
  trip_type: string;
  captain_required: 'yes' | 'no' | 'not_sure';
  captain_type?: string;
  accommodation_needed: boolean;
  transport_needed: boolean;
  additional_requirements?: string;
  created_at?: string;
}

export interface Review {
  id: string;
  user_id: string;
  user?: User;
  trip_id?: string;
  captain_id?: string;
  rating: number;
  comment: string;
  created_at: string;
}
