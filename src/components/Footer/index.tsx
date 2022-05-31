import React, { useState } from "react";

import { getImg } from "../../utils/Helper";
import './index.css';

const Footer = () => {

    return (
        <footer className="mt_150">
            <div className="d_flex align_items_center justify_content_right pt_100">
                <p>Brought to you by</p>
                <div>
                    <img src={getImg('footer.svg')} width={275} height={150} alt="Footer"/>
                </div>
            </div>
        </footer>
    )
}

export default Footer