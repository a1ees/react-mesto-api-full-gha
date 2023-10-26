import React from "react";

function AuthForm(props) {
  return (
    <section className='authform'>
      <div className="authform__container">
        <h2 className='authform__title'>{props.title}</h2>
        <form onSubmit={props.onSubmit} className="authform__form">
          {props.children}
        </form>
      </div>
    </section>
  );
}

export default AuthForm;