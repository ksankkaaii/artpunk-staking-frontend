import React from "react";

const ProgressBar = (props: {
  bgcolor: string,
  completed: Number
}) => {
  const { completed } = props;
  
  const containerStyles:Object = {
    width: '100%',
    backgroundColor: "#04131a",
    borderRadius: 50,
    border: 'solid #18252d 3px'
  }
  
  const fillerStyles:Object = {
    height: '100%',
    width: `${completed}%`,
    background: 'linear-gradient(0.25turn, #cb31d1, #4ca2dd, #e61ce0)',
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 1s ease-in-out',
  }
  const labelStyles:Object = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}></span>
        {/* <span style={labelStyles}>{`${completed}%`}</span> */}
      </div>
    </div>
  );
};

export default ProgressBar;