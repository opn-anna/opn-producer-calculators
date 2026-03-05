import { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import posthog from "posthog-js";

const SURVEY_ID = "019c0dbb-3fb4-0000-cef7-25d59f3b5928";

export function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    
    try {
      // Send survey response to PostHog
      posthog.capture("survey sent", {
        $survey_id: SURVEY_ID,
        $survey_response: feedback.trim(),
      });

      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully.",
      });

      setFeedback("");
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        id="feedback-button"
        data-feedback-trigger
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Send feedback"
        onClick={() => setOpen(true)}
      >
        <MessageSquare className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Feedback</DialogTitle>
            <DialogDescription>
              We'd love to hear your thoughts, suggestions, or any issues you've encountered.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-2">
            <Textarea
              placeholder="What feedback do you have for us?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!feedback.trim() || isSubmitting}
              >
                <Send className="h-4 w-4 mr-1" />
                {isSubmitting ? "Sending..." : "Submit"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
