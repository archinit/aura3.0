"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ActivityLoggerProps{
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const activityTypes = [
  { id: "meditation", name: "Meditation" },
  { id: "exercise", name: "Exercise" },
  { id: "walking", name: "Walking" },
  { id: "reading", name: "Reading" },
  { id: "journaling", name: "Journaling" },
  { id: "therapy", name: "Therapy Session" },
];


export const ActivityLogger = ({open, onOpenChange}: ActivityLoggerProps) => {
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // if (!type || !name) {
        //     toast({
        //         title: "Missing information",
        //         description: "Please fill in all required fields",
        //         variant: "destructive",
        //     });
        //     return;
        //     }
            setIsLoading(true);

        setTimeout(() => {
            console.log({
                type, name, duration, description
            });
            


            //Reset fields
            setName("");
            setType("");
            setDuration("");
            setDescription("");
            setIsLoading(false);

            alert("Activity logged (mock)!")
            onOpenChange(false)  //close model
        }, 1000)           
    }

    return <>
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Log Activity
                    </DialogTitle>
                    <DialogDescription>
                        Record Your Wellness activity
                    </DialogDescription>
                </DialogHeader>
                <form action="" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label>Activity Type</Label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select activity type" />
                                <SelectContent>
                                    {activityTypes.map((type) => (
                                        <SelectItem key={type.id} value={type.id}>
                                            {type.name}
                                        </SelectItem>
                                    ) )}
                                </SelectContent>
                            </SelectTrigger>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Morning Meditation, Evening Walk, etc."
                        />
                    </div>

                    <div className="space-y-2 mt-3">
                        <Label>Duration (minutes)</Label>
                        <Input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="15"
                        />
                    </div>

                    <div className="space-y-2 mt-3">
                        <Label>Description (optional)</Label>
                        <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="How did it go?"
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-3">
                        <Button type="button" variant="ghost">
                            Cancel
                        </Button>
                        <Button type="submit" disabled>
                            Save Activity
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </>
}