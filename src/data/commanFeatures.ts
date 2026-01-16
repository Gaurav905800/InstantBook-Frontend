import { Heart, MapPin, type LucideIcon } from "lucide-react";
import { BadgeCheck, House } from "lucide-react";

type FeaturesType = {
  id: number;
  feature: string;
  description?: string;
  icon: LucideIcon;
};

export const commanFeatures: FeaturesType[] = [
  {
    id: 1,
    feature: "Clean & Safe Stays.",
    description: "A well-maintained and hygienic space just for you.",
    icon: House,
  },
  {
    id: 2,
    feature: "Enhanced Cleaning.",
    description: "This host follows Staybnd's cleaning standards.",
    icon: BadgeCheck,
  },
  {
    id: 3,
    feature: "Excellent location.",
    description: "90% of guests rated the location 5 stars",
    icon: MapPin,
  },
  {
    id: 4,
    feature: "Smooth Check-In",
    description: "100% of guests gave check-in a 5-star rating.",
    icon: Heart,
  },
];
