"use client";

import { useParams } from "next/navigation";
import MainCard from "~/components/main-card";
import Loading from "~/components/loading";
import MermaidChart from "~/components/mermaid-diagram";
import { useDiagram } from "~/hooks/useDiagram";
import { ApiKeyDialog } from "~/components/api-key-dialog";
import { Button } from "~/components/ui/button";
import { ApiKeyButton } from "~/components/api-key-button";
import { CopyButton } from "~/components/copy-button";
import { DownloadButton } from "~/components/download-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function Repo() {
  const params = useParams<{ username: string; repo: string }>();
  const {
    diagram,
    error,
    loading,
    lastGenerated,
    cost,
    isRegenerating,
    showApiKeyDialog,
    tokenCount,
    handleModify,
    handleRegenerate,
    handleCopy,
    handleDownload,
    handleApiKeySubmit,
    handleCloseApiKeyDialog,
    handleOpenApiKeyDialog,
  } = useDiagram(params.username, params.repo);

  return (
    <div className="flex min-h-screen flex-col items-center p-4">
      <div className="flex w-full justify-center pt-8">
        <MainCard
          isHome={false}
          username={params.username}
          repo={params.repo}
          showCustomization={!loading && !error}
          onModify={handleModify}
          onRegenerate={handleRegenerate}
          onCopy={handleCopy}
          lastGenerated={lastGenerated}
        />
      </div>
      <div className="mt-8 flex w-full flex-col items-center gap-8">
        {loading ? (
          <div className="mt-12">
            <Loading cost={cost} isModifying={!isRegenerating} />
          </div>
        ) : error ? (
          <div className="mt-12 text-center">
            <p className="max-w-4xl text-lg font-medium text-red-600">
              {error}
            </p>
            {error.includes("Rate limit") && (
              <p className="mt-2 text-sm text-gray-600">
                Rate limits: 1 request per minute, 5 requests per day
              </p>
            )}
            {error.includes("token limit") && (
              <div className="mt-8 flex flex-col items-center gap-2">
                <ApiKeyButton onClick={handleOpenApiKeyDialog} />
                <p className="mt-2 text-sm">Your key will not be stored</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center px-4">
              <MermaidChart chart={diagram} />
            </div>
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-lg font-medium">Diagram Actions</h3>
              <div className="flex gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleCopy}
                        className="flex items-center gap-2 border-[3px] border-black bg-purple-400 p-4 px-4 text-base text-black shadow-[4px_4px_0_0_#000000] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:transform hover:bg-purple-400 sm:p-4 sm:px-6 sm:text-base"
                      >
                        <span className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                          </svg>
                        </span>
                        <span>Copy Code</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy diagram code to clipboard</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleDownload}
                        className="flex items-center gap-2 border-[3px] border-black bg-purple-400 p-4 px-4 text-base text-black shadow-[4px_4px_0_0_#000000] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:transform hover:bg-purple-400 sm:p-4 sm:px-6 sm:text-base"
                      >
                        <span className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                        </span>
                        <span>Open Diagram</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Open and download the diagram</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </>
        )}
      </div>

      <ApiKeyDialog
        isOpen={showApiKeyDialog}
        onClose={handleCloseApiKeyDialog}
        onSubmit={handleApiKeySubmit}
        tokenCount={tokenCount}
      />
    </div>
  );
}
