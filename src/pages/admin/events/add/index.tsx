import React, { useState } from "react";
import AdminSideBar from "@/components/AdminSidebar/AdminSideBar";
import Input from "@/components/Input/Input";
import TextArea from "@/components/TextArea/TextArea";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { EVENTS_CATEGORIES } from "@/constants/events";
import Select from "@/components/Select/Select";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { MdOutlineCancel } from 'react-icons/md'
import { RiDeleteBin2Line } from "react-icons/ri";
import { IPackage, IMerchandise, IInformation, IEvent } from "@/interfaces/event";
import axios from "axios";
import { EventClient } from "@/service/event/eventClient";
import { PackageClient } from "@/service/package/packageClient";
import { MerchandiseClient } from "@/service/merchandise/merchandiseClient";
import { InformationClient } from "@/service/information/informationClient";
import { useUser } from "@/store/user/useUser";
import DotsLoading from "@/components/DotsLoading/DotsLoading";
import { ToastContainer, ToastContent, TypeOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const AddEvent = () => {
  const [eventData, setEventData] = useState<IEvent>({
    title: "",
    description:"",
    date: "",
    startTime:"",
    duration:0,
    location: "",
    category:0,
    price: 0,
    thumbnail: "",
    id: 0
  });

  const [packages, setPackages] = useState<IPackage[]>([
    {
      eventId:0,
      name:"",
      price:0,
      maxQty:0,
      availableTicket:0
    }
  ])
  const [merchandises, setMerchandises] = useState<IMerchandise[]>([])
  const [informations, setInformations] = useState<IInformation[]>([
    {
      eventId:0,
      title:"",
      description:""
    }
  ])
  const [temporaryThumbnail, setTemporaryThumbnail] = useState<File>()
  const [tempMerchImages, setTempMerchImages] = useState<File[]>([])
  const postEvent = useUser.use.postEvent()
  const loadingPostEvent = useUser.use.loadingPostEvent()
  const postEventSuccess = useUser.use.postEventSuccess()
  const router = useRouter()

  const handleChangeEventData = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    key: string
  ) => {
    if(key === "duration" || key === "price"){
      setEventData({ ...eventData, [key]: parseInt(e.target.value) });
    } else {
      setEventData({ ...eventData, [key]: e.target.value });
    }
  };

  const handleChangePackagesInfo = (e:React.ChangeEvent<HTMLInputElement>, index:number, key:string) => {
    const updatedPackages = [...packages]
    if(key === 'maxQty' || key === "price"){
      const updatedPackage = {...updatedPackages[index], [key]:parseInt(e.target.value)}
      updatedPackages[index] = updatedPackage

    } else {
      const updatedPackage = {...updatedPackages[index], [key]:e.target.value}
      updatedPackages[index] = updatedPackage

    }
    setPackages(updatedPackages)
    setEventData({...eventData, price:packages[0]?.price!})
  }
  
  const handleSaveTempThumbImage = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const selectedFiles = event.target.files as FileList;
    setTemporaryThumbnail(selectedFiles?.[0]);
  }

  const handleAddPackage = () =>{
    setPackages([...packages, {
      eventId:0,
      name:"",
      price:0,
      maxQty:0,
      availableTicket:0
    }])
  }

  const handleRemovePackage = (index:number) =>{
    const updatedPackages = [...packages.slice(0, index), ...packages.slice(index + 1)];
    setPackages(updatedPackages)
  }

  const handleAddMerchandise = () => {
    setMerchandises([...merchandises, {
      eventId:0,
      name:"",
      price:0,
      maxStock:0,
      availableStock:0,
      image:""
    }])
  }
  
  const handleRemoveMerchandise = (index:number) => {
    if(merchandises.length === 1){
      setMerchandises([])
    } else {
      const updatedMerchandises = [...merchandises.slice(0, index), ...merchandises.slice(index + 1)];
      setMerchandises(updatedMerchandises)
    }
  }

  const handleChangeMerchandisesInfo = (e:React.ChangeEvent<HTMLInputElement>, index:number, key:string) => {
    const updatedMerchandises = [...merchandises]
    if(key === 'maxStock' || key === "price"){

      const updatedMerchandise = {...merchandises[index], [key]:parseInt(e.target.value)}
      updatedMerchandises[index] = updatedMerchandise
    } else {
      const updatedMerchandise = {...merchandises[index], [key]:e.target.value}
      updatedMerchandises[index] = updatedMerchandise

    }
    setMerchandises(updatedMerchandises)
    
  }

  const handleAddTempMerchImages = (event: React.ChangeEvent<HTMLInputElement>,index:number) =>{
    const updatedTempMerchImages = [...tempMerchImages]
    const selectedFiles = event.target.files as FileList
    if(tempMerchImages.length === 0){
      updatedTempMerchImages.push(selectedFiles?.[0])
    } else {
      updatedTempMerchImages[index] = selectedFiles?.[0]
    }
    setTempMerchImages(updatedTempMerchImages)
  }

  const handleAddInformation = () =>{
    setInformations([...informations, {
      eventId:0,
      title:"",
      description:"",
    }])
  }

  const handleRemoveInformation = (index:number) => {
    const updatedInformations = [...informations.slice(0, index), ...informations.slice(index + 1)];
    setInformations(updatedInformations)
  }

  const handleChangeInfo = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index:number, key:string) =>{
    const updatedInformations = [...informations]
    const updatedInformation = {...updatedInformations[index], [key]:e.target.value}
    updatedInformations[index] = updatedInformation
    setInformations(updatedInformations)
  }

  const handleUpload = async (file: File) => {
    const CLOUDINARY_URL =
      "https://api.cloudinary.com/v1_1/dewqus3ph/image/upload";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "he1h55mc");

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      return response.data.secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  const notify = (message: ToastContent, type: TypeOptions) => {
    toast(message, {
      type: type,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleSubmitCreateEvent = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postEvent();
    try {
      // upload thumbail to cloudinary
      const urlThumbnail = await handleUpload(temporaryThumbnail!);
      console.log(urlThumbnail)

      // post event to get eventId
      const eventResponse = await EventClient.createEvent({...eventData, thumbnail:urlThumbnail});
      const eventResponseData:IEvent = eventResponse?.data!
      const eventId = eventResponseData.id;
  
      // post merchandise (if its available)
      if(merchandises.length !== 0){
        for await (const [index, merchFile] of tempMerchImages.entries()) {
          const merchUrl = await handleUpload(merchFile);
          const updatedMerch = {...merchandises[index], eventId:eventId, image:merchUrl, availableStock:merchandises[index].maxStock}
          await MerchandiseClient.postMerchandise(updatedMerch);
        }
      }
  
      // post package to db
      for await (const ticket of packages) {
        const updatedTicket = {...ticket, eventId:eventId, availableTicket:ticket.maxQty}
        await PackageClient.postPackage(updatedTicket);
      } 
  
      //post informations
      for await (const information of informations) {
        const updatedInformation = {...information, eventId:eventId}
        await InformationClient.postInformation(updatedInformation)
      }
      notify("Event Successfully Created" as ToastContent, "success");
      setTimeout(() => {
        postEventSuccess()
        router.push("/admin/events")
      }, 1000)
    } catch (error:any) {
      console.log(error)
      notify(error.message as ToastContent, "error");
      postEventSuccess()

    }
  }

  return (
    <div className="admin-event-add-page flex flex-row">
      <ToastContainer />
      <AdminSideBar />
      <div className="admin-events-add-content-wrapper w-full flex flex-col justify-between h-[100vh] pl-[350px] pb-[200px]">
        <div className="admin-events-add-content py-10 px-[76px]">
          <div className="admin-events-add-heading flex flex-row justify-between items-center">
            <h1 className="admin-events-add-heading-title text-[28px] font-bold text-[#102E61]">
              FORM ADD EVENT
            </h1>
          </div>
          <div className="admin-event-add-form-wrapper pt-[50px] w-full">
            <form className="addEventFormWrapper flex flex-col justify-center items-center w-full" onSubmit={handleSubmitCreateEvent}>
              <div className="addEventFormTop flex flex-row gap-[50px] w-full">
                <div className="addEventFormLeft flex flex-col w-full gap-3">
                  <div className="addEventFormImagePhotos flex w-full mb-4">
                      <div className="addEventFormImageInput relative w-full">
                        {/* Label */}
                        <span className="flex-1 text-[14px] md:text-[16px] font-bold mb-[9px] ">
                          Event Thumbnail <span className="text-red-500"> *</span>
                        </span>
                        <input
                          accept="image/*"
                          onChange={handleSaveTempThumbImage}
                          multiple
                          type="file"
                          id={`image`}
                          name="filename"
                          hidden
                          required
                        />
                        {/* Display */}
                        <div className="relative h-[300px] rounded-xl mt-4 ">
                          {temporaryThumbnail ? (
                            <Image
                              className="w-full h-full"
                              src={
                                temporaryThumbnail ? URL.createObjectURL(temporaryThumbnail) : ""
                              }
                              alt="modelImage"
                              width={500}
                              height={500}
                            />
                          ) : (
                            <div className="h-full w-full border-2 border-dashed flex justify-center items-center">
                              <p className="text-center text-[20px] font-bold text-primary">
                                No Image
                              </p>
                            </div>
                          )}
                          {/* Label For Input */}
                          <label
                            className="bg-darkBlue/40 hover:bg-primary/80 text-white hover:text-white p-2 w-full h-[100px] hover:cursor-pointer flex flex-col justify-center items-center shadow-lg  border-secondaryText mt-[9px] absolute bottom-0"
                            htmlFor={`image`}
                          >
                            <AiOutlineCloudUpload
                              size={50}
                              className="text-white"
                            />
                            <p className={"font-bold"}>Upload Event Thumbnail</p>
                          </label>
                          <p>{temporaryThumbnail?.name}</p>
                        </div>
                      </div>
                  </div>
                </div>
                <div className="addEventFormRight flex flex-col w-full gap-4">
                  <Input
                    label="Event Name"
                    placeholder="event name..."
                    name={"title"}
                    type="text"
                    value={eventData.title}
                    onChange={(e) => handleChangeEventData(e, "title")}
                    required
                    autoFocus
                  />
                  <div className="Category">
                    <p className="flex-1 text-[14px] md:text-[16px] font-bold">
                        Event Category <span className="text-red-500"> *</span>
                    </p>
                    <Select
                      value={eventData.category}
                      data={EVENTS_CATEGORIES.slice(1, EVENTS_CATEGORIES.length)}
                      onChange={(e) => handleChangeEventData(e, "category")}
                    />
                  </div>
                  <div className="input-form-date-time-wrapper grid grid-cols-3 gap-4">
                    <Input
                      label="Date"
                      name={"date"}
                      type="date"
                      value={eventData.date}
                      onChange={(e) => handleChangeEventData(e, "date")}
                      required
                    />
                    <Input
                      label="Start Time"
                      name={"startTime"}
                      type="time"
                      value={eventData.startTime}
                      onChange={(e) => handleChangeEventData(e, "startTime")}
                      required
                    />
                    <Input
                      label="Duration (min)"
                      name={"duration"}
                      type="number"
                      pattern="[0-9]+"
                      value={eventData.duration === 0 ? "" : eventData.duration}
                      onChange={(e) => handleChangeEventData(e, "duration")}
                      required
                    />
                  </div>
                  <TextArea
                    label="Description"
                    placeholder="event description"
                    name="description"
                    value={eventData.description}
                    onChange={(e) => handleChangeEventData(e, "description")}
                    required
                  />
                  <Input
                    label="Location"
                    placeholder="event location..."
                    name={"location"}
                    type="text"
                    value={eventData.location}
                    onChange={(e) => handleChangeEventData(e, "location")}
                    required
                  />
                </div>
              </div>
              {/* Packages */}
              <div className='PackageSection w-full border-b-[1px] pt-6 pb-2 mb-4 sticky top-0 bg-white z-30 bg-blur'>
                <p className="PackageSectionTitleText text-[20px] font-bold">Event Package</p>
              </div>
              <div className="addEventFormBottom w-full grid grid-cols-3 gap-4">
                {packages.map((ticketPack:IPackage, idx:number) => 
                  <div key={`key:${idx}`} className='AddPackageWrapper flex flex-col gap-2 p-2 border-[1px] border-primaryBlue rounded-lg mb-4'>
                    {idx !== 0 &&
                      <button className="flex justify-end" onClick={()=>handleRemovePackage(idx)}>
                        <MdOutlineCancel className="text-right text-[24px] hover:text-red-500" />
                      </button>
                    }
                    <div className='grid grid-rows-3 gap-3'>
                      <Input 
                        label="Package Name"
                        id="name"
                        name="name"
                        type="text"
                        value={ticketPack.name}
                        onChange={(e) => handleChangePackagesInfo(e, idx, "name")}
                        placeholder="Package Name"
                        required
                      /> 
                      <Input 
                        label="Price (Rp)"
                        id="price"
                        name="price"
                        min={0}
                        value={ticketPack.price}
                        onChange={(e) => handleChangePackagesInfo(e, idx, "price")}
                        type="number"
                        pattern="[0-9]+"
                        validation="Price must only positive number"
                        required
                      /> 
                      <Input 
                        label="Quantity"
                        id="quantity"
                        min={0}
                        name="quantity"
                        type="number"
                        pattern="[0-9]+"
                        validation="Quantity must only positive number"
                        value={ticketPack.maxQty}
                        onChange={(e) => handleChangePackagesInfo(e, idx, "maxQty")}
                        required
                      /> 
                    </div>
                  </div>
                )}
                <Button 
                  label="+ Add Package"
                  type="button"
                  onClick={()=>handleAddPackage()}
                />
              </div>
              {/* Packages End */}
              {/* Merchandises */}
              <div className='MerchandiseSection w-full border-b-[1px] pt-6 pb-2 mb-4 sticky top-0 bg-white z-30 bg-blur'>
                <p className="MerchandiseSectionTitleText text-[20px] font-bold">Event Merchandise</p>
              </div>
              <div className="addEventFormBottom w-full grid grid-cols-3 gap-4">
                {merchandises.map((merchandise:IMerchandise, idx:number) => 
                  <div key={`key:${idx}`} className='AddMerchandiseWrapper flex flex-col gap-2 p-2 border-[1px] border-primaryBlue rounded-lg mb-4'>
                    <button className="flex justify-end" onClick={()=>handleRemoveMerchandise(idx)}>
                      <MdOutlineCancel className="text-right text-[24px] hover:text-red-500" />
                    </button>
                    <div className="addEventFormImageInput relative w-full mb-5">
                      {/* Label */}
                      <span className="flex-1 text-[14px] md:text-[16px] font-bold mb-[9px] ">
                        Merchandise Image <span className="text-red-500"> *</span>
                      </span>
                      <input
                        accept="image/*"
                        onChange={(e) => handleAddTempMerchImages(e,idx)}
                        multiple
                        type="file"
                        id={`image: ${idx}`}
                        name="filename"
                        hidden
                        required
                      />
                      {/* Display */}
                      <div className="relative h-[300px] rounded-xl mt-4 ">
                        {tempMerchImages[idx] ? (
                          <Image
                            className="w-full h-full"
                            src={
                              tempMerchImages[idx] ? URL.createObjectURL(tempMerchImages[idx]) : ""
                            }
                            alt="modelImage"
                            width={500}
                            height={500}
                          />
                        ) : (
                          <div className="h-full w-full border-2 border-dashed flex justify-center items-center">
                            <p className="text-center text-[20px] font-bold text-primary">
                              No Image
                            </p>
                          </div>
                        )}
                        {/* Label For Input */}
                        <label
                          className="bg-darkBlue/40 hover:bg-primary/80 text-white hover:text-white p-2 w-full h-[100px] hover:cursor-pointer flex flex-col justify-center items-center shadow-lg  border-secondaryText mt-[9px] absolute bottom-0"
                          htmlFor={`image: ${idx}`}
                        >
                          <AiOutlineCloudUpload
                            size={50}
                            className="text-white"
                          />
                          <p className={"font-bold"}>Upload Merchandise Image</p>
                        </label>
                        <p>{tempMerchImages[idx]?.name}</p>
                      </div>
                    </div>
                    <div className='grid grid-rows-3 gap-3'>
                      <Input 
                        label="Merchandise Name"
                        id="name"
                        name="name"
                        type="text"
                        value={merchandise?.name!}
                        onChange={(e) => handleChangeMerchandisesInfo(e, idx, "name")}
                        placeholder="Merchandise Name"
                        required
                      /> 
                      <Input 
                        label="Price (Rp)"
                        id="price"
                        name="price"
                        min={0}
                        type="number"
                        pattern="[0-9]+"
                        validation="Price must only positive number"
                        value={merchandise?.price!}
                        onChange={(e) => handleChangeMerchandisesInfo(e, idx, "price")}
                        required
                      /> 
                      <Input 
                        label="Quantity"
                        id="quantity"
                        name="quantity"
                        min={0}
                        type="number"
                        pattern="[0-9]+"
                        validation="Quantity must only positive number"
                        value={String(merchandise.maxStock)}
                        onChange={(e) => handleChangeMerchandisesInfo(e, idx, "maxStock")}
                        required
                      /> 
                    </div>
                  </div>
                )}
                <Button 
                  label="+ Add Merchandise"
                  type="button"
                  onClick={()=>handleAddMerchandise()}
                />
              </div>
              {/* Merchandises End */}
              {/* Informations */}
              <div className='MerchandiseSection w-full border-b-[1px] pt-6 pb-2 mb-4 mt-4 sticky top-0 bg-white z-30 bg-blur'>
                <p className="MerchandiseSectionTitleText text-[20px] font-bold">Event Information</p>
              </div>
              <div className="addEventFormBottom w-full grid grid-cols-3 gap-4">
                {informations.map((information:IInformation, idx:number) => 
                  <div key={`key:${idx}`} className='AddPInformationsWrapper flex flex-col gap-2 p-2 border-[1px] border-primaryBlue rounded-lg mb-4'>
                    {idx !== 0 &&
                      <button className="flex justify-end" onClick={()=>handleRemoveInformation(idx)}>
                        <MdOutlineCancel className="text-right text-[24px] hover:text-red-500" />
                      </button>
                    }
                      <Input 
                        label="Title"
                        id="title"
                        name="title"
                        type="text"
                        value={information.title}
                        onChange={(e) => handleChangeInfo(e, idx, "title")}
                        required
                      /> 
                      <TextArea
                        label="Description"
                        id="description"
                        placeholder="information description"
                        name="description"
                        value={information.description}
                        onChange={(e) => handleChangeInfo(e, idx, "description")}
                        required
                      />
                  </div>
                )}
                <Button 
                  label="+ Add Information"
                  type="button"
                  onClick={()=>handleAddInformation()}
                />
              </div>
              {/* Informations End */}
              {loadingPostEvent ? 
                <DotsLoading />
                :
                <div className="mt-8 w-full flex justify-end">
                  <div className="w-[200px]">
                    <Button
                      defaultButton
                      active
                      label="Add Event"
                      type="submit"
                    />
                  </div>
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

type InformationProps = {
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
    index: number
  ) => void;
  index: number;
  title: string;
  description: string;
  onDelete: (index: number) => void;
};

const Information = ({
  onChange,
  index,
  title,
  description,
  onDelete,
}: InformationProps) => {
  return (
    <div className="border-2 p-2 mt-4">
      <div className="topWrapper flex flex-row items-start">
        <p className="flex-1 text-[14px] md:text-[16px] font-bold">{"Title"}</p>

        {index !== 0 && (
          <button type="button" onClick={() => onDelete(index)}>
            <RiDeleteBin2Line
              size={26}
              className="text-[#102E61] hover:text-red-700"
            />
          </button>
        )}
      </div>
      <Input
        type="text"
        name="title"
        value={title}
        onChange={(e) => onChange(e, "title", index)}
        required
      />

      <label htmlFor="" className="font-bold">
        Description
      </label>
      <TextArea
        id=""
        name="description"
        value={description}
        onChange={(e) => onChange(e, "description", index)}
        required
      />
    </div>
  );
};

export default AddEvent;
