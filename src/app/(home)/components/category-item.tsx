import { Badge } from "@/components/ui/badge";
import { Category } from "@prisma/client";
import {
  HeadphonesIcon,
  KeyboardIcon,
  MonitorIcon,
  MouseIcon,
  SpeakerIcon,
  SquareIcon,
} from "lucide-react";

interface ICategoryProps {
  category: Category;
}

export const CategoryItem = ({ category }: ICategoryProps) => {
  //refatorar
  const categoryIcon = {
    keyboards: <KeyboardIcon size={16} />,
    mouses: <MouseIcon size={16} />,
    headphones: <HeadphonesIcon size={16} />,
    mousepads: <SquareIcon size={16} />,
    speakers: <SpeakerIcon size={16} />,
    monitors: <MonitorIcon size={16} />,
  };

  return (
    <Badge
      variant={"outline"}
      className="flex  gap-2 justify-center items-center py-2  "
    >
      {categoryIcon[category?.slug as keyof typeof categoryIcon]}

      {category?.name}
    </Badge>
  );
};
