import {useRef, useState,useEffect, useMemo} from "react";
import CEditor from "./CEditor";
import CList from "./CList";
import Top from "../contents/Top";

function Community() {

  const [data,setDate] = useState([]);

  const dataId = useRef(0)

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      //slice = 0부터 20까지 데이터를 자를것임
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        //Math.random()*5 = 0부터 4까지의 난수 생성(소수점까지 포함)
        //Math.floor = 소수점을 없애줌 , +1 = 5까지   
        created_date: new Date().getTime() + 1,
        id: dataId.current++
      };
    });
    setDate(initData);
  };

  useEffect(() => {
      getData();
  }, []);

  const onCreate = (author,content,emotion) => {
    const create_date = new Date().getTime();
    const newItem ={
      author,
      content,
      emotion,
      create_date,
      id : dataId.current
    }
    dataId.current += 1;
    setDate([ newItem,...data]);
  };

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setDate(newDiaryList);
  }

  const onEdit = (targetId,newContent) => {
    setDate(
      data.map((it)=>
      it.id === targetId ? {...it,content:newContent}: it)
    )
  }

  return (

      <>
      <Top/>
      <CEditor onCreate={onCreate}/>
      <CList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
      </>
  );
}

export default Community;