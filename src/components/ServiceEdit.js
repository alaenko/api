import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { editChangeServiceField, editServiceCancel, EditService, fetchEditService } from '../actions/actionCreators';
import { Link, Redirect, Route } from 'react-router-dom'


function ServiceEdit({match}) {
  const {item, loading, error, redirect} = useSelector(state => state.serviceEdit);
  const dispatch = useDispatch();
  const id = match.params.id;
  
  useEffect(() => {
    dispatch(fetchEditService(id));
  },[dispatch, id]);

  const handleChange = evt => {
    const {name, value} = evt.target;
    dispatch(editChangeServiceField(name, value));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(EditService());
  }
  
  const handleCancel = () => {
    dispatch(editServiceCancel());
  }
  
  if (redirect) {
    return <Route path="*" render={() => (<Redirect to="/services" />)} />
  } 

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Произошла ошибка!</p>;
  }

  return (
    <React.Fragment>
    {item && 
      <form onSubmit={handleSubmit}>
        <label>Название
          <input name='name' onChange={handleChange} value={item.name} />
        </label>
        <label>Стоимость
          <input name='price' onChange={handleChange} value={item.price} />
        </label>
        <label>Описание
          <input name='content' onChange={handleChange} value={item.content} />
        </label>
        <button type='submit'>Save</button>
        <Link to="/" onClick={handleCancel}>Cancel</Link>
        {error && <p>{error}</p>}
      </form>
    }
    </React.Fragment>
  )
    
}

export default ServiceEdit;
