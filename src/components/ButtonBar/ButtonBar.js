import logo from './logo.png'
import './ButtonBar.css'

export function ButtonBar(props) {

    return (
        <div className="button-container">
            <img className="logo" src={logo} alt="logo" />

            <button 
                className="reset button" 
                ref={props.forwardResetRef} 
                onClick={()=>props.callReset()}>New Array</button>

            <label className="seperator">|</label>

            <button 
                className="selection button" 
                ref={props.forwardSelectionRef} 
                onClick={()=>props.callSelection()}>Selection</button>
            <button 
                className="insertion button" 
                ref={props.forwardInsertionRef} 
                onClick={()=>props.callInsertion()}>Insertion</button>
            <button 
                className="quick button" 
                ref={props.forwardQuickRef} 
                onClick={()=>props.callQuick()}>Quick</button>
            <button 
                className="heap button" 
                ref={props.forwardHeapRef} 
                onClick={()=>props.callHeap()}>Heap</button>
            <button 
                className="merge button" 
                ref={props.forwardMergeRef} 
                onClick={()=>props.callMerge()}>Merge</button>
        </div>
    );
}