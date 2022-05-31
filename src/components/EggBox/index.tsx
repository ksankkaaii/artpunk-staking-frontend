import Button from "../Button/index";

import './index.css';

const EggBox = (props: any) => {

    const { img, onClicks, values, lockable, locked, amount, name, attribute, day, current, loop, type } = props
    return (
        <>
        <div className={loop? 'loop' : ''} >
            <div className={lockable? "egg lockable" : "egg"}>
                <img src={img} className="main" alt={type === 0 ? "Artpunk" : "Achievement"}/>
                {
                    lockable && 
                    <div className="description">
                        <img src={locked === true ? "lock.png" : "unlock.png"} alt="lock"/>
                        <div className="amount">
                            +{amount} $FIRE
                        </div>
                    </div>
                }
            </div>
            <div className="detail">
                <div>
                    <p className="font_30 font_600">
                        {name}
                    </p>
                </div>
                <div className="mt_5 pb_10 divider">
                    <p className="font_20 mid_blue font_600">
                        { type === 0 ? `Restoration Grade: ${attribute}` : `Achievement type: ${attribute}`}
                    </p>
                    <p className="font_20 mid_purple font_600">
                        {day} $ARTE / DAY
                    </p>
                </div>
                {current !== undefined &&
                 <div className="mt_5">
                    <p className="font_23">
                        Current: <span className="font_600">{Number(current).toFixed(4)} $ARTE</span> 
                    </p>
                </div>               
                }

                <div className="button-group mt_20">
                    {
                        values.map((value: any, index: number) => 
                            index % 2 === 1?
                            <Button key={index} value={value} style={{ width: 130, height: 38 }} light onClick={onClicks[index]} />:
                            <Button key={index} value={value} style={{ width: 130, height: 38 }} dark onClick={onClicks[index]} />
                        )
                    }
                </div>
            </div>

        </div>

        <div></div>
        </>
    )
}

export default EggBox