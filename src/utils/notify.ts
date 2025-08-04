import { toast } from "sonner";

export const notify = {
  success: (message: string) => {
    toast.success(message);
  },
  error: (message: string) => {
    toast.error(message);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: (message: string, options?: any) => {
    toast.info(message, options); 
  },
  warning: (message: string) => {
    toast.warning(message);
  },
};