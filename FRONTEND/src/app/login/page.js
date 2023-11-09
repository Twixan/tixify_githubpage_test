import React from 'react'

import styles from './styles.login.module.css'

import LoginForm from '../components_web/forms/LoginForm.jsx'


export default function LoginPage() {
    return (
        <div className={styles.LoginContainer}> 



            <div className={styles.LoginFormContainer}> 
                <LoginForm />            
            </div>
        </div>
    )
}
