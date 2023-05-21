import React, { useState, useEffect, CSSProperties } from "react";
import axios from "axios";
import "antd/dist/reset.css";
import { Table} from "antd";
import {sector,country,region,topic} from "../../Constant/index"
import {columns} from "../../Constant/columns"


const viewBranchWise = () => {
  // console.log(sector)
  const [Sector,setSector] = useState("")
  const [Topic,setTopic] = useState("")
  const [Region,setRegion] = useState("")
  const [Country,setCountry] = useState("")
  const [minimum, setMinimum] = useState();
  const [maximum, setMaximum] = useState();
  const [defaultData, setDefault] = useState([]);
  const [call,setCall]=useState(false)


  const url = import.meta.env.VITE_BACKEND_LINK;
  const getData = async () => {
    await axios
      .get(url + "/ns/")
      .then((response) => {
        // console.log(response)
        setDefault(response.data);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (call) {
      axios
        .post(url + "/ns/find", {
          topic: Topic,
          sector: Sector,
          country: Country,
          min: minimum,
          max: maximum,
          region: Region,
        })
        .then((response) => {
          console.log(response);
          setDefault(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [
    setDefault,
    Topic,
    Sector,
    Country,
    Region,
    call,
    minimum,
    maximum,
  ]);

  return (
    <>
      <div className="">
        <div className="head md:p-5">
          <h2 className="text-2xl font-bold p-2 mobs:text-lg">
            Table View
          </h2>
          <p className="md:p-2 mobs:px-2 mobs:text-sm">
          The given Table data represents an insight related to the World natural gas,oil,Resource Related outlook.
          </p>
        </div>
      </div>
      <div
        className={
          "w-full flex md:flex-row mobs:flex-col justify-start text-sm mobs:mx-5"
        }
      >
        <div className="homeStates my-1 md:w-1/3 md:px-10 mobs:mr-10">
          <div className="flex justify-between font-medium">
            <span>Sector</span>
          </div>
          <select
            name="states"
            className="p-2 w-full border-solid border-[#D1D5DB] border rounded-md "
            onChange={(e) => {
              setSector(e.target.value);
              setCall(true);
            }}
          >
            {sector.map((state) => {
                      return <option value={state}>{state}</option>;
                    })}
          </select>
        </div>
        <div className="homeStates my-1 md:w-1/3 md:px-10 mobs:mr-10">
          <div className="flex justify-between font-medium">
            <span>Topic</span>
          </div>
          <select
            name="states"
            className="p-2 w-full border-solid border-[#D1D5DB] border rounded-md "
            onChange={(e) => {
              setTopic(e.target.value);
              setCall(true);
            }}
          >
            {topic?.map((state) => {
              return <option value={state}>{state}</option>;
            })}
          </select>
        </div>
        <div className="homeStates my-1 md:w-1/3 md:px-10 mobs:mr-10">
          <div className="flex justify-between font-medium">
            <span>Region</span>
          </div>
          <select
            name="states"
            className="p-2 w-full border-solid border-[#D1D5DB] border rounded-md"
            onChange={(e) => {
              setRegion(e.target.value);
              setCall(true);
            }}
          >
            {region?.map((state) => {
                      return <option value={state}>{state}</option>;
                    })}
          </select>
        </div>
      </div>
      <div
        className={
          "w-full flex md:flex-row mobs:flex-col justify-start text-sm mobs:mx-5"
        }
      >
        <div className="homeStates my-1 md:w-1/3 md:px-10 mobs:mr-10">
          <div className="flex justify-between font-medium">
            <span>Country</span>
          </div>
          <select
            name="states"
            className="p-2 w-full border-solid border-[#D1D5DB] border rounded-md "
            onChange={(e) => {
              setCountry(e.target.value);
              setCall(true);
            }}
          >
            {country?.map((state) => {
                      return <option value={state}>{state}</option>;
                    })}
          </select>
        </div>
        <div className="homeStates my-1 md:w-1/3 md:px-10 mobs:mr-10">
          <div className="flex justify-between font-medium">
            <span>Minimum Intensity</span>
          </div>
          <input
            type="number"
            max={100}
            min={1}
            maxLength={3}
            className="p-2 w-full border-solid border-[#D1D5DB] border rounded-md "
            onChange={(e) => {
              setMinimum(e.target.value);
              // setRequiredState(false);
            }}
          ></input>
        </div>
        <div className="homeStates my-1 md:w-1/3 md:px-10 mobs:mr-10">
          <div className="flex justify-between font-medium">
            <span>Maximum Intensity</span>
          </div>
          <input
            type="number"
            min={0}
            max={100}
            maxLength={3}
            className="p-2 w-full border-solid border-[#D1D5DB] border rounded-md "
            onChange={(e) => {
              setMaximum(e.target.value);
              // setRequiredState(false);
            }}
          ></input>
        </div>
      </div>

      <div className="w-[94%] mt-5 md:ml-10 mobs:mx-5 mb-7 text-sm border rounded-lg md:mr-10  text-gray-500 overflow-x-auto">
        <Table columns={columns} dataSource={defaultData}></Table>
      </div>
    </>
  );
};

export default viewBranchWise;
