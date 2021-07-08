import { useRef, useState } from 'react';

import css from './quickOne.module.scss';
import { randomIdGenerator } from '../../utils/utility';

const defaultColor = '#8884d8';


export default function PercentColorChooser({minVal, maxVal}) {

    const containerRef =  useRef();
    const [breakpoints, setBreakpoints] = useState([]); 

    const [hoverValue, setHoverValue] = useState({
        xPos: 0, value: minVal
    }); 

    function getXPosAndValue(event, boundingClient) {
        const xPos = event.clientX - boundingClient.left;
        const value = Math.round( (((event.clientX - boundingClient.left) / boundingClient.width) * (maxVal - minVal)) + minVal );
        return [xPos, value];
    }

    function addBreakPoints(event) {
        if (event.button === 0) {
            // Add a new breakpoint
            // User Click coords found by - clientX, clientY. and the container left is found by - getBoundingClientRect().left
            // So - (clientX - getBoundingClientRect().left) is the xPos and  / getBoundingClientRect().width * ( max - min ) will be the value
            const boundingClient = containerRef.current.getBoundingClientRect();
            const [xPos, value] = getXPosAndValue(event, boundingClient);
            
            setBreakpoints([...breakpoints, {id: randomIdGenerator(4), color: defaultColor, value: value, xPos: xPos}])
        }
    }

    function showRelatedValue(event) {
        const boundingClient = containerRef.current.getBoundingClientRect();
        const [xPos, value] = getXPosAndValue(event, boundingClient);

        setHoverValue({showHover: true, xPos, value});
    }

    function hideRelatedValue(event) {
        setHoverValue({showHover: false});
    }

    function changeBreakPoints(event, breakpoint) {
        event.stopPropagation();
        if (event.button === 2) {
            setBreakpoints(breakpoints.filter(_breakpoint => _breakpoint.id !== breakpoint.id));
        }
        return false;
    }

    function saveBreakpointColor(breakpoint, color) {
        setBreakpoints(breakpoints.map(_breakpoint => {
            if (_breakpoint.id === breakpoint.id) {
                _breakpoint.color = color;
            }

            return _breakpoint;
        }));
    } 

    return (
        <div id="outerContainer" className="mt-2">
            <p className="is-size-7">The start of the bar is <b>{minVal}</b>, and the end of the bar is <b>{maxVal}</b>. <br/> Click on the bar, to create ranges. <br/> Click on a point to open the picker & choose a different color. ( Value less than the created point would be shown in that color.) <br/> <i>Right click</i> on a point to remove it. </p>
            { hoverValue?.showHover && <div className={`is-size-7 mb-1`} style = {{position: 'absolute', left: `${hoverValue?.xPos}px`}}>{hoverValue?.value}</div> }
            <div className={`${css.container} mt-4`} onMouseDown={addBreakPoints} onMouseMove={showRelatedValue} onMouseOut={hideRelatedValue} ref={containerRef} onContextMenu={event => event.preventDefault() }>
                { breakpoints.map(breakpoint => {
                        return <div className={`${css.percentItem}`}
                            style={{
                                left : `${breakpoint.xPos - 6}px`
                            }}>
                            <input type="color" className={`${css.circleItem}`} key={breakpoint.id} 
                                value={breakpoint.color} onChange={event => saveBreakpointColor(breakpoint, event.target.value)} 
                                onMouseDown={event => changeBreakPoints(event, breakpoint)}
                            />
                            {/* <div className="is-size-7 pt-2">{Math.round(breakpoint.value)}</div> */}
                        </div>
                        
                    })
                }
            </div>
            <div className="tags mt-4">
                { breakpoints.map(breakpoint => {
                        return <span className="tag" style={{
                            backgroundColor : `${breakpoint.color}`
                        }}> &lt; {Math.round(breakpoint.value)}</span>     
                    })
                }
            </div>
        </div>
    )
}