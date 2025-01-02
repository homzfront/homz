"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import VisitorRecords from "../../../accessControlComponents/records";
import AddVisitor from "../../../accessControlComponents/addVisitor";
import Link from "next/link";
import api from "@/utils/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import Loading from "@/components/mainmenu/loading";

const AccessRecords = ({ params }) => {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("");
  // const [property, setProperty] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };
  const fetchData = async (page, status, property) => {
    // Construct the query based on pagination and filters
    let query = `/visitor/accesscontrol/enterprise/get?page=${page}`;
    if ( status || property) {
      // setEnabled(true);
      query += `&accessStatus=${status}&property=${property.trim()}`;
      // query += `&dateFiliter=${date}&accessStatus=${status}&property=${property}`;

      setPage(page || 1);
    }
    return await api.get(query);
  };
  const {
    isPending,
    // refetch,
    data
  } = useQuery({
    queryKey: ["users", page, status, searchValue],
    queryFn: async () => {
      return await fetchData(page, status, searchValue);
    },
    placeholderData: keepPreviousData,
    select: (users) => {
      return users.data.data;
    },
    // enabled: enable,
  });
  
  // Debounced function for setting the search term
  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((value) => {
        setSearchValue(value);
      }, 800),
    []
  );
  const handleReset=()=>{
    setSearchValue("")
    setStatus("")
    // setProperty("")
   }

  if (isPending) {
    return <Loading />;
  }
// console.log(data)

const handleInputChange = (e) => {
  debouncedSetSearchTerm(e.target.value);
};
  return (
    <div className="mb-10 pt-9 flex flex-col space-y-7 px-8 md:px-8 md:pt-3">
      <div className="flex items-center md:items-start space-x-10 md:hidden md:pl-2">
        <Link
          href="/dashboard/enterprise-property/tenants"
          className="bg-[#EEF5FF] rounded-[8px] p-[4px] md:hidden"
        >
          <Image
            src={"/static/images/Button.svg"}
            alt=""
            height={22}
            width={22}
          />
        </Link>
        <p className=" md:text-[20px] text-[700]">Visitor Access Request</p>
        <button
          className="bg-[#006AFF] text-[#FFFFFF] text-[14px] font-[500] leading-[17.64px] flex items-center justify-center gap-[10px] rounded-[4px] h-fit p-[5px]"
          onClick={openModal}
        >
          <Image
            src="/static/images/add-visitor.svg"
            height={16}
            width={16}
            alt=""
          />
        </button>
      </div>
      {data ? (
        <>
          <VisitorRecords
            Data={data}
            setSearchValue={setSearchValue}
            setModalOpen={setModalOpen}
            reSet={handleReset}
            getStatus={setStatus}
            setPage={setPage}
            currentPage={page}
            handleInputChange={handleInputChange}
          />
        </>
      ) : (
        <>
          <div className="">
            <p className="mb-2 text-[20px]">Visitor Access Request</p>
            <p className="text-[#4E4E4E] leading-[27px] mb-3">
              Visitor records of all your tenants will be displayed here
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center h-[412px] space-y-6">
              <Image
                src="/static/images/visitorRecordIcon.svg"
                alt=""
                height={100}
                width={100}
                className="rounded-[8px]"
              />

              <button
                className="bg-[#006AFF] text-[#FFFFFF] text-[14px] font-[500] leading-[17.64px] flex items-center justify-center gap-[10px] rounded-[4px] h-[48px] p-[12px]"
                onClick={openModal}
              >
                <Image
                  src="/static/images/add-visitor.svg"
                  height={16}
                  width={16}
                  alt=""
                />
                <p>Register Visitor</p>
              </button>
            </div>
          </div>
        </>
      )}

      <AddVisitor modalIsOpen={modalOpen} closeModal={setModalOpen} />
    </div>
  );
};

export default AccessRecords;
