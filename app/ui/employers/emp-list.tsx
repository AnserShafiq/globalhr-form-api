'use client'

import { ArrowLeft, ArrowRight, RotateCw, Trash2Icon, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Emp_List } from "../../lib/element";
import Loading_JS from "../loading-display/list-loading";

export default function EmployersList() {
    const [data, setData] = useState<Emp_List[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState("");

    const ITEMS_PER_PAGE = 12;


    const fetchData = async () => {
        try {
          const response = await fetch(`/api/employers/list/all`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError("Failed to load employers");
          console.error(err);
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
    
    fetchData();
  }, []);

  const numberOfPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const endIndex = currentPage * ITEMS_PER_PAGE;
  const startIndex = endIndex - ITEMS_PER_PAGE;
  const activeCols = data.slice(startIndex, endIndex);

  const changePage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const decreasePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const increasePage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <Loading_JS />
    );
  }

  if (error) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  const deleteRecord = async(id:string | string[]) => {
    const resp = await fetch(`/api/employers/delete`,{
        method: 'DELETE',
        body: JSON.stringify([id])
    })
    if(resp.ok){
        fetchData();
        setSelected([]);
    }
  }
  const selectionCall = (id:string) => {
    if(selected.includes(id)){
        setSelected((prev) => (prev.filter(item => item !== id )))
    }else{
        setSelected((prev) => [...prev,id])
    }
  }

  return (
    <div className="w-full h-full overflow-auto flex flex-col relative font-poppins">
      <h1 className="text-lg font-semibold font-poppins w-fit mx-auto my-2 underline">
        Employers
      </h1>
        <div className='absolute top-3 right-5 text-sm font-[500] flex gap-2'>
        <h3 className=" inline-flex items-center gap-1 text-gray-700 cursor-pointer" onClick={() => fetchData()}>Reload<RotateCw className="w-auto h-4" /></h3>
            {
                selected.length > 0 ? <>
                    <h3 className=" inline-flex items-center gap-1 text-gray-700 cursor-pointer" onClick={() => setSelected([])}>Clear<X className="w-auto h-4" /></h3>
                    <h3 className=" inline-flex items-center gap-1 text-red-ghr cursor-pointer" onClick={() => deleteRecord(selected)}>Delete<Trash2Icon className="w-auto h-4" /></h3>
                </> :null
            }
        </div>
      {data.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-lg">No employer</p>
        </div>
      ) : (
        <>
          <table className="rounded-xl border border-gray-200 w-full overflow-auto flex flex-col">
            <thead className="w-full">
              <tr className="grid grid-cols-[20%_15%_20%_15%_20%_10%] font-poppins text-md font-medium border-y border-gray-200 px-3">
                <td className="border-r border-gray-200 py-1">Agent name</td>
                <td className="border-r border-gray-200 pl-2 py-1">Contact</td>
                <td className="border-r border-gray-200 pl-2 py-1">Company name</td>
                <td className="border-r border-gray-200 pl-2 py-1">City</td>
                <td className="border-r border-gray-200 pl-2 py-1">Cand. Required</td>
                <td className="pl-2 py-1 flex justify-center">-</td>
              </tr>
            </thead>
            <tbody className="w-full">
              {activeCols.map((emp) => (
                <tr
                  key={emp?.id}
                  className={`grid grid-cols-[20%_15%_20%_15%_20%_10%] font-poppins text-md font-light p-3 border-b border-gray-200 ${selected.includes(emp.id)? 'bg-gray-300':''}`}
                >
                  <td className="py-1 cursor-pointer hover:underline" onClick={() => selectionCall(emp.id)}>{`${emp?.firstName} ${emp.lastName}`}</td>
                  <td className="pl-2 py-1">{emp.contactNumber}</td>
                  <td className="px-2 py-1 text-nowrap overflow-hidden">{emp.companyName}</td>
                  <td className="pl-2 py-1">{emp.city}</td>
                  <td className="pl-2 py-1">{emp.candidatesNeeded}</td>
                  <td className="pl-2 py-1 flex justify-center">
                    <Link
                      className="mt-1 text-xs font-semibold font-poppins w-fit mx-auto cursor-pointer text-black hover:underline"
                      href = {`/portal/employers/${emp.id}`}
                    >
                      View
                    </Link>
                    <a
                        onClick={() => deleteRecord(emp.id)}
                      className="mt-1 text-xs font-semibold font-poppins w-fit mx-auto cursor-pointer text-red-ghr hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className={`w-full ${ data.length > 12 ? 'flex': 'hidden'} gap-4 items-center justify-center mt-4`}>
            <button 
              onClick={decreasePage} 
              disabled={currentPage === 1}
              className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: numberOfPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => changePage(page)} className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    currentPage === page ? "bg-red-ghr text-white"  : "hover:bg-gray-200" }`}>
                  {page}
                </button>
                ))}
            </div>
            
            <button 
              onClick={increasePage} 
              disabled={currentPage === numberOfPages}
              className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}