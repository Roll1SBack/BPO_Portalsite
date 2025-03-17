import React, {useState, useEffect} from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { color } from "framer-motion";

const PaperSizeSlider = ({ label, value, onChange }) => {
    // Generate marks from 0 to 8 with the current value in bold and larger fontSize
    const [marks, setMarks] = useState({});

    useEffect(() => {
      const newMarks = {};
      for (let i = 0; i <= 8; i++) {
        newMarks[i] = {
          style: i === value ? { fontWeight: "bold", fontSize: "16px", color: "#0B0" } : { fontWeight: "normal", fontSize: "12px" },
          label: i.toString(),
        };
      }
      setMarks(newMarks);
    }, [value]);

    return (
        <div>
            <label className="block text-sm font-medium text-gray-600">{label}</label>
            <Slider
                min={0}
                max={8}
                step={1}
                value={value}
                onChange={onChange}
                marks={marks}
                trackStyle={{ backgroundColor: "#4ade80" }}
                handleStyle={{ borderColor: "#4ade80" }}
                defaultValue={0}
            />
        </div>
    );
};

export default PaperSizeSlider;