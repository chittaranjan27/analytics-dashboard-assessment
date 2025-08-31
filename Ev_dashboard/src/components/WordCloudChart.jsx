import { TagCloud } from 'react-tagcloud';
import React, { useState, useEffect } from 'react';

const WordCloudChart = ({ data }) => {
  const [makeWordData, setMakeWordData] = useState([]);

  useEffect(() => {

    if (!data || data.length === 0) return; 

    // Filter data for 2023 and prepare word cloud data
    const prepareWordCloudData = () => {
      const filteredData = data.filter((row) => row['Model Year'] === '2023');
      const makeCount = filteredData.reduce((acc, row) => {
        const make = row['Make'];
        acc[make] = (acc[make] || 0) + 1;
        return acc;
      }, {});

      const wordData = Object.keys(makeCount).map((make) => ({
        value: make,
        count: makeCount[make],
      }));

      setMakeWordData(wordData);
    };

    prepareWordCloudData();

  }, [data]);

  const styles = {
    container: {
      padding: '1em',
      fontFamily: 'Arial, sans-serif', 
      height: '100%', 
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
      
    },
    tagCloud: {
      fontFamily: 'Arial, monospace', 
    },
  };

  return (
    <div style={styles.container}>
      <TagCloud
        minSize={15}
        maxSize={35}
        tags={makeWordData}
        colorOptions={{
          luminosity: 'light', 
          hue: 'blue',       
        }}
        style={styles.tagCloud}
      />
    </div>
  );
};

export default WordCloudChart;
