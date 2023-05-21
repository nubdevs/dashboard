import axios from "axios";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { BiBarChartAlt2 } from "react-icons/bi";
import { BsTable } from "react-icons/bs";
import Table from "../component/Table";

const ChartUI = () => {
  const [ view, setView ] = useState(false);

  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [pieSwitch, setPieSwitch] = useState(false);
  const [topicData, setTopicData] = useState([]);
  const [sectorData, setSectorData] = useState([]);

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const url = import.meta.env.VITE_BACKEND_LINK;

  const getData = async () => {
    await axios
      .get(url + "/ns/")
      .then((response) => {
        setAllData(response.data);
        //  console.log(data)
        const sectorSum = {};
        response.data.forEach((item) => {
          const sector = item.sector;
          const intensity = item.intensity;
          if (sectorSum.hasOwnProperty(sector)) {
            sectorSum[sector] += intensity;
          } else {
            sectorSum[sector] = intensity;
          }
        });
        const sector = Object.entries(sectorSum).map(([name, value]) => ({
          name,
          value,
        }));

        const topicSum = {};
        response.data.forEach((item) => {
          const topic = item.topic;
          const intensity = item.intensity;

          // If the topic exists in the topicSum object, add the intensity
          if (topicSum.hasOwnProperty(topic)) {
            topicSum[topic] += intensity;
          }
          // If the topic doesn't exist, initialize it with the intensity
          else {
            topicSum[topic] = intensity;
          }
        });

        // Convert the topicSum object into an array of objects with name and value properties
        const topic = Object.entries(topicSum).map(([name, value]) => ({
          name,
          value,
        }));
        setTopicData(topic);
        setSectorData(sector);
        setData(sector);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSwitch = () => {
    setPieSwitch(!pieSwitch);
    if (pieSwitch) {
      setData(topicData);
    } else {
      setData(sectorData);
    }
  };

  return (
      <div className="">
        <div className="w-full flex  justify-center mt-2 gap-x-5">
          <h2 className="text-center font-semibold text-3xl text-gray-500">
            {!view ? "TOPIC-INTENSITY WISE ANALYSIS" : "TABLE WISE ANALYSIS"}
          </h2>
          {/* <button
            className="rounded-lg bg-purple-400 hover:bg-purple-600 text-white p-2 px-3"
            onClick={handleSwitch}
          >
            Switch
          </button> */}
          <button
            onClick={() => setView(!view)}
            className=" items-center cursor-pointer flex flex-row p-2 rounded-lg hover:bg-purple-600 bg-purple-400 text-white"
          >
            {!view ? <BsTable size={25} /> : <BiBarChartAlt2 size={25} />}
          </button>
        </div>

        {view ? (
          <Table />
        ) : (
    <div className="w-full flex justify-center items-center">

          <PieChart width={1000} height={1000}>
            <Pie
              data={data}
              dataKey="value"
              cx={500}
              cy={350}
              innerRadius={150}
              outerRadius={200}
              paddingAngle={1}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  onClick={() => {
                    alert("hi");
                  }}
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Legend verticalAlign="right" />
            <Tooltip />
          </PieChart>
    </div>

        )}
      </div>
  );
};

export default ChartUI;
