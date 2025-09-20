"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

type formState = {
  currentStep: number;
  formData: {
    name: string;
    description: string;
    type: string;
    codeFile?: File;
    readmeFile?: File;
  };
};
type Action =
  | { type: "next" }
  | { type: "prev" }
  | { type: "reset" }
  | { type: "change"; key: string; value: any };

const initialState: formState = {
  currentStep: 1,
  formData: {
    name: "",
    description: "",
    type: "HOOK",
    codeFile: undefined,
    readmeFile: undefined,
  },
};

const reducer = (state: formState, action: Action): formState => {
  if (action.type === "next")
    return { ...state, currentStep: state.currentStep + 1 };
  if (action.type === "prev")
    return { ...state, currentStep: state.currentStep - 1 };
  if (action.type === "reset") return initialState;
  if (action.type === "change")
    return {
      ...state,
      formData: { ...state.formData, [action.key]: action.value },
    };
  return state;
};

export function DialogDemo() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [isOpen, setIsOpen] = React.useState(false);
  console.log(state);
  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();

    try {
      const formData = new FormData();
      formData.append("type", state.formData.type);
      formData.append("name", state.formData.name);
      formData.append("description", state.formData.description);
      // ✅ append BOTH files under the SAME field name expected by multer: "files"
      if (!state.formData.codeFile || !state.formData.readmeFile) {
        throw new Error("Please select both Code and Readme files.");
      }
      formData.append("files", state.formData.codeFile);
      formData.append("files", state.formData.readmeFile);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/create`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      setIsOpen(false);
      dispatch({ type: "reset" });
      return data;
    } catch (err) {
      console.error("Error creating discovery:", err);
    }
  };

  // animation presets
  const pageVariants = {
    initial: { opacity: 0, y: 8 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>

      {/* shadcn already provides open/close animations on DialogContent */}
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              Create Discovery - Step {state.currentStep} of 3
            </DialogTitle>
            <DialogDescription>
              {state.currentStep === 1 &&
                "Enter basic information about your discovery."}
              {state.currentStep === 2 && "Upload a file and select the type."}
              {state.currentStep === 3 && "Review and confirm your submission."}
            </DialogDescription>
          </DialogHeader>

          {/* Step Progress Dots (animated) */}
          <div className="flex justify-center mb-4">
            <div className="flex space-x-2">
              {[1, 2, 3].map((step) => (
                <motion.div
                  key={step}
                  className="w-3 h-3 rounded-full"
                  animate={{
                    backgroundColor:
                      step <= state.currentStep
                        ? "rgb(59 130 246)"
                        : "rgb(209 213 219)",
                    scale: step === state.currentStep ? 1.15 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              ))}
            </div>
          </div>

          {/* Animated step content */}
          <div className="grid gap-4 py-4 min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={state.currentStep} // key is crucial for exit/enter
                variants={pageVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {/* Step 1 */}
                {state.currentStep === 1 && (
                  <>
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">Name</Label>
                      <Input
                        id="name-1"
                        name="name"
                        value={state.formData.name}
                        onChange={(e) =>
                          dispatch({
                            type: "change",
                            key: e.target.name,
                            value: e.target.value,
                          })
                        }
                        placeholder="Enter name"
                        required
                      />
                    </div>
                    <div className="grid gap-3 mt-3">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        name="description"
                        value={state.formData.description}
                        onChange={(e) =>
                          dispatch({
                            type: "change",
                            key: e.target.name,
                            value: e.target.value,
                          })
                        }
                        placeholder="Enter description"
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <Switch
                        id="type-switch"
                        checked={state.formData.type === "UI"}
                        onCheckedChange={(checked) =>
                          dispatch({
                            type: "change",
                            key: "type",
                            value: checked ? "UI" : "HOOK",
                          })
                        }
                      />
                      <Label htmlFor="type-switch">
                        Type: {state.formData.type}
                      </Label>
                    </div>
                  </>
                )}

                {/* Step 2 */}
                {state.currentStep === 2 && (
                  <div className="grid gap-3">
                    <Label htmlFor="code-upload">Code:</Label>
                    <Input
                      id="code-upload"
                      name="codeFile"
                      type="file"
                      onChange={(e) =>
                        dispatch({
                          type: "change",
                          key: "codeFile",
                          value: e.target.files?.[0],
                        })
                      }
                      accept=".js,.ts,.jsx,.tsx,.json"
                      required
                    />

                    <Label htmlFor="readme-upload">Read Me:</Label>
                    <Input
                      id="readme-upload"
                      name="readmeFile"
                      type="file"
                      onChange={(e) =>
                        dispatch({
                          type: "change",
                          key: "readmeFile",
                          value: e.target.files?.[0],
                        })
                      }
                      accept=".md,.markdown,.mdx"
                      required
                    />
                  </div>
                )}

                {/* Step 3 */}
                {state.currentStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <Label className="font-semibold">Name:</Label>
                      <p className="text-sm text-gray-600">
                        {state.formData.name}
                      </p>
                    </div>
                    <div>
                      <Label className="font-semibold">Description:</Label>
                      <p className="text-sm text-gray-600">
                        {state.formData.description}
                      </p>
                    </div>
                    <div>
                      <Label className="font-semibold">Type:</Label>
                      <p className="text-sm text-gray-600">
                        {state.formData.type}
                      </p>
                    </div>
                    <div>
                      <Label className="font-semibold">File:</Label>
                      <p className="text-sm text-gray-600">
                        {state.formData.codeFile
                          ? state.formData.codeFile.name
                          : "No code file"}{" "}
                        /{" "}
                        {state.formData.readmeFile
                          ? state.formData.readmeFile.name
                          : "No readme"}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <DialogFooter>
            {state.currentStep > 1 && (
              <Button type="button" onClick={() => dispatch({ type: "prev" })}>
                Back
              </Button>
            )}
            {state.currentStep < 3 ? (
              <Button type="button" onClick={() => dispatch({ type: "next" })}>
                Next
              </Button>
            ) : (
              // keep it a button & call submit handler manually
              <Button type="button" onClick={() => handleSubmit()}>
                Submit
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
