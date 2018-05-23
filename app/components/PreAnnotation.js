import React from 'react';
import ReactDOM from 'react-dom';
import {
  getLabelPosition,
  getPathD,
  keyPressHandler,
} from '../utils/annotation';

const PreAnnotation = ({
  imageWidth,
  imageHeight,
  hix,
  aix,
  pix,
  mode,
  preAnnotation,
  hover,
  onLabelChange,
  onPolygonMouseDown,
  onPolygonMouseUp,
  onPolygonMouseEnter,
  onPolygonMouseLeave,
  onPrePointMouseEnter,
  onPrePointMouseLeave,
}) => (
  <svg
    className='ori'
    style={{
      display: mode === 'ADD_POINT' ? 'block' : 'none'
    }}
  >
    {
      preAnnotation.points.map((curPoint, index) => {
        if (index === 0) {
          return;
        }
        const prePoint = preAnnotation.points[index - 1];
        return (
          <line
            x1={prePoint[0]}
            y1={prePoint[1]}
            x2={curPoint[0]}
            y2={curPoint[1]}
          />
        )
      })
    }
    <path
      className='ori'
      // d={getPathD(imageWidth, imageHeight, false, preAnnotation.points)}
      // fill='blue'
      // fill-rule='evenodd'
      // opacity='0.5'
    />
    <polygon
      // data-aix={aix}
      // points={preAnnotation.points}
      // onMouseDown={onPolygonMouseDown}
      // onMouseUp={onPolygonMouseUp}
      // onMouseEnter={onPolygonMouseEnter}
      // onMouseLeave={onPolygonMouseLeave}
      // TODO: A bit hacky here.
      // onDoubleClick={() => document.querySelector('#input-' + aix).focus()}
    />
    {
      preAnnotation.points.map((point, index) =>
        <circle
          r={ pix === index ? 8 : 5 }
          key={index}
          data-aix={aix}
          data-pix={index}
          cx={point[0]}
          cy={point[1]}
          onMouseEnter={index === 0 && onPrePointMouseEnter}
          onMouseLeave={index === 0 && onPrePointMouseLeave}
          style={{
            fill: pix === index ? 'lime' : 'white',
            stroke: pix === index ? 'blue' : 'black',
          }}
        />
      )
    }
    <foreignObject
      x={getLabelPosition(preAnnotation.points, 0)}
      y={getLabelPosition(preAnnotation.points, 1)}
      width='100'
      height='20'
      style={{
        visibility: hover ? 'visible' : 'hidden'
      }}
    >
      <input
        type='text'
        className='labelInput'
        placeholder='label me'
        id={'input-' + aix}
        data-aix={aix}
        value={preAnnotation.label}
        onChange={onLabelChange}
        onKeyPress={keyPressHandler}
      />
    </foreignObject>
  </svg>
)

export default PreAnnotation;