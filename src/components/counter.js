import React, { useState } from "react";
import Countdown from 'react-countdown';
import styled from "styled-components";

const Container = styled.div`
width: 130px;
height: 130px;
display: flex;
justify-content: center;
align-items: center;
position: relative;

`
const Svgcirc = styled.svg`

position: absolute;
width: 100%;
height: 100%;
top: 0;
bottom: 0;
left: 0;
right: 0;`
const CircleBg = styled.circle`
fill: none;
stroke-width: 40px;
stroke: #bdc3c7;
`
const Circ = styled.circle`
    fill: none;
    stroke-width: 40px;
    stroke: #1abc9c;
    stroke-dasharray:  500 1000;
`
const MidT = styled.p`
    font-weight:900;
    font-size:1.8rem;
`
const TopT = styled.p`
    font-weight:600;
    font-size:0.8rem;
    position:absolute;
    // bottom:0;

    transform:translateY(25px);
`
const OfferT = styled.p`
    font-weight:700;
    font-size:1.2rem;
    text-align:left;
    padding-left:20px;
`
const PerTick = (props) => {
    return (<Container>
        <TopT>{props.lbl}</TopT>
        <MidT>{props.time}</MidT>
        <Svgcirc
            x="0px"
            y="0px"
            viewBox="0 0 397.6 435.3"
            enableBackground="new 0 0 397.6 435.3"
            className="svg"
            xmlSpace="preserve"
        >
            <CircleBg
                class="circle-bg"
                cx="198.3"
                cy="217.3"
                r="160"
                transform="rotate(270 198.3 217.3)"
            />

            <Circ
                style={{ strokeDasharray: `${props.perc} 1000` }}
                class="circle"
                cx="198.3"
                cy="217.3"
                r="160"
                transform="rotate(270 198.3 217.3)"
            />
        </Svgcirc>
    </Container>
    )
}
export default (props) => {
    const [timer, setTimer] = useState([0, 0, 0, 0]);
    const [loading,setLoading] = useState(true);
    const [currTime, setCurrTime] = useState(Date.now() + 274209449)
    return (<div style={{position:'relative'}}>
        <OfferT>Hurry Up! Offer ends in</OfferT>
        {loading?<h1>Loading....</h1>:<div style={{ position: 'relative', display: 'flex' }}>
            {timer}
        </div>}
        <Countdown className="sqa" style={{ position:'absolute',opacity:'0' ,display:'none',visibility:'hidden',width:'0',height:'0',maxHeight:'0',maxWidth:'0'}} date={currTime}
        onTick={(e) => {
            if(loading){
                setLoading(false)
            }    
            let x = [e.days, e.hours, e.minutes, e.seconds];
            setTimer(x.map((e, i) => {
                let txt = ""
                switch (i) {
                    case 0:
                        txt = "DAYS"
                        break;
                    case 1:
                        txt = "HOURS"
                        break;
                    case 2:
                        txt = "MINS"
                        break;
                    case 3:
                        txt = "SECS"
                        break;
                }
                let perc = e / 0.06
                let perc2 = 1000 - perc;
                if (i == 0) {
                    perc = e / 0.0365
                    perc2 = 1000 - perc
                }
                return (<PerTick lbl={txt} perc={perc} time={String(e).length >= 2 ? e : "0" + e}></PerTick>)
            }))
            console.log(timer);
        }}>
        </Countdown>
    </div>
    )
}