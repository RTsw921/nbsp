import React from 'react'
export default (props)=>(
    <div style={{paddingTop:"30px"}}>
        <p>Выбран пользователь <b>{props.person.firstName+" "+props.person.lastName}</b><br/></p>
        <p>Описание:<br/><textarea defaultValue={props.person.description}/><br/></p>
        <p>Адрес проживания:<b> {props.person.address.streetAddress}</b><br/></p>
        <p>Город:<b> {props.person.address.city}</b><br/></p>
        <p>Провинция/штат:<b> {props.person.address.state}</b><br/></p>
        <p>Индекс:<b> {props.person.address.zip}</b></p>
    </div>
)