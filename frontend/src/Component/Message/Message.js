import React from 'react'
import './Message.css'

const Message = ({ user, text, name }) => {

  let isCurrentUser = false;
  let isAdmin = false;

  if (user.toLowerCase() === 'admin') {
    isAdmin = true
  }

  if (user.toLowerCase() === name.toLowerCase()) {
    isCurrentUser = true
  }


  return (
    <>

      {
        (isCurrentUser) ?
          <div className='messages'>
            <div className='message-user-right'>
              {user}
            </div>
            <div className='box-right message-right'>
              {text}
            </div>
          </div>

          :

          (isAdmin) ?
            <div>
              <div className='messages-center'>
                <div className='box-center'>
                  {text}
                </div>
              </div>
            </div>

            :

            <div>
              <div className='messages'>
                <div className='message-user-left'>
                  {user}
                </div>
                <div className='box-left message-left'>
                  {text}
                </div>
              </div>
            </div>
      }


    </>
  )
}

export default Message