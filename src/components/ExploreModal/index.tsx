import { url } from "inspector";
import React, { useState} from "react";

import './index.css';

const ExploreModal = (props: any) => {

    const { lockingPeriod, clickSend, clickCancel, type } = props
    const [ selected, setSelected ] = useState(-1);

    return (
        <div className="exploer-div">
            <div className="modal">
                <div className="body">
                    <div className="font_52">
                        Explore the InfinityVerse
                    </div>
                    <div className="font_20">
                        Choose the Lockingperiod
                    </div>
                    <div className="lands">
                        {lockingPeriod.map((locking: any, index: number) => (
                            <div className="land" key={index}>
                                <div className={selected === index ? "container selected" : "container"} 
                                    style={{backgroundImage: `url(${locking.image})`, backgroundSize: 'cover' }}
                                    onClick={() => setSelected(index)}>
                                    {locking.title}
                                </div>
                                <div className="font_14">
                                    {type === 'teenage' ? locking.fireCount : locking.fireCount * 3 / 2} $FIRE per Day
                                </div>
                                <div className="font_8">
                                    LP: {locking.lp}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="footer">
                    <div className="btn" onClick={() => clickSend(selected)}>
                        SEND ON EXPLORATION
                    </div>
                    <div className="btn" onClick={clickCancel}>
                        CANCEL
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExploreModal