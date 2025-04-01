import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Download, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

interface DownloadButtonProps {
  onClick: () => void;
}

export function DownloadButton({ onClick }: DownloadButtonProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleClick = () => {
    onClick();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000); // Reset after 2 seconds
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleClick}
            className="border-[3px] border-black bg-purple-400 p-4 px-4 text-base text-black shadow-[4px_4px_0_0_#000000] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:transform hover:bg-purple-400 sm:p-6 sm:px-6 sm:text-lg"
          >
            {downloaded ? (
              <Check className="h-6 w-6" />
            ) : (
              <Download className="h-6 w-6" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{downloaded ? "Downloaded!" : "Download as PNG"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 