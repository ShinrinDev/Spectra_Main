import { Tooltip, Typography } from "@material-tailwind/react";
import { CircleHelpIcon } from "lucide-react";

export function TooltipWithHelperIcon({ title, content }) {
    return (
        <Tooltip
            className="z-[10000]"
            content={
                <div className="w-80">
                    <Typography color="white" className="font-medium">
                        {title}
                    </Typography>
                    <Typography
                        variant="small"
                        color="white"
                        className="font-normal opacity-80"
                    >
                        {content}
                    </Typography>
                </div>
            }
        >
            <CircleHelpIcon fill="#424242" className="text-white ml-2 cursor-pointer" />
        </Tooltip>
    );
}