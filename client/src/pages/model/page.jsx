import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

import { useModelStore } from "@/stores/useModelStore";

import SketchfabModalViewer from "./components/viewer";

export default function MonumentsDashboard() {
  const { models, getModels, isLoading } = useModelStore();
  const [isArModalOpen, setIsArModalOpen] = useState(false);
  const [selectedModelUid, setSelectedModelUid] = useState(null);

  useEffect(() => {
    getModels();
  }, []);

  const handleArViewClick = (uid) => {
    setSelectedModelUid(uid);
    setIsArModalOpen(true);
  };

  // This function is called when a user clicks "AR View"
  const handleArLinkClick = (arlink) => {
    window.open(arlink, "_blank");
  };

  // Transform monuments data for HoverEffect component
  const hoverItems = models.map((monument, index) => ({
    title: monument.name,
    description: monument.description,
    link: `#monument-${monument._id}`,
    monument: monument,
    index: index,
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Spinner className="text-white" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Monuments of India
      </h1>

      {/* Monument Cards with Hover Effect */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((monument, idx) => (
          <div
            key={monument._id}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          >
            {/* Hover Background Effect */}
            <div className="absolute inset-0 h-full w-full bg-slate-800/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

            {/* Monument Card */}
            <Card className="relative z-20 bg-zinc-900 border-zinc-700 text-white group-hover:border-slate-700 transition-colors duration-300">
              <CardHeader>
                <img
                  src={monument.imageUrl}
                  alt={monument.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <CardTitle className="pt-4 px-6">{monument.name}</CardTitle>
                <CardDescription className="px-6 text-zinc-400">
                  {monument.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">
                    {monument.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      Built: {monument.yearBuilt}
                    </Badge>
                    <Badge variant="outline" className="text-white">
                      {monument.architecture}
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-3 pb-4">
                <Button
                  className="flex-1 bg-white hover:bg-gray-200 text-black transition-colors duration-200"
                  onClick={() => handleArViewClick(monument.sketchfabUid)}
                >
                  3D Model View
                </Button>
                <Button
                  className="flex-1 bg-black hover:bg-gray-800 border border-zinc-800 transition-colors duration-200"
                  onClick={() => handleArLinkClick(monument.arlink)}
                >
                  AR View
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {/* 2. The Full-Screen Modal (Dialog) */}
      <Dialog open={isArModalOpen} onOpenChange={setIsArModalOpen}>
        <DialogContent className="sm:max-w-screen w-screen h-screen bg-black border-zinc-700 p-0 m-0">
          <DialogHeader className="p-4 bg-zinc-900/90 backdrop-blur">
            <DialogTitle className="text-white">
              3D Model Viewer{" "}
              {selectedModelUid ? `- Loading Interactive Model...` : ""}
            </DialogTitle>
          </DialogHeader>
          <div className="w-full h-[calc(100vh-60px)]">
            {/* This is the key: We only render the viewer if the modal is open 
              and we pass it the selected model's UID.
            */}
            {selectedModelUid && (
              <SketchfabModalViewer uid={selectedModelUid} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
