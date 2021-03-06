import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
	const auth = useContext(AuthContext);
	const message = useMessage();
	const { loading, request, error, clearError } = useHttp();
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		message(error);
		clearError();
	}, [error, message, clearError]);

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	const changeHandler = (event) => {
		const { name, value } = event.target;
		setForm({ ...form, [name]: value });
	};

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', { ...form });
			message(data.message);
		} catch (e) {}
	};

	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', { ...form });
			auth.login(data.token, data.userId);
		} catch (e) {}
	};

	return (
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>Сократи Ссылку</h1>
				<div className="card blue darken-1">
					<div className="card-content white-text">
						<span className="card-title">Авторизация</span>
						<div>
							<div className="input-field">
								<input
									placeholder="Введите email"
									id="email"
									type="text"
									name="email"
									className="yellow-input"
									value={form.email}
									autoComplete="new-password"
									onChange={changeHandler}
								/>
								<label htmlFor="email">Email</label>
							</div>
							<div className="input-field">
								<input
									placeholder="Введите пароль"
									id="password"
									type="password"
									name="password"
									className="yellow-input"
									value={form.password}
									onChange={changeHandler}
									autoComplete="new-password"
								/>
								<label htmlFor="password">Пароль</label>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button
							className="btn yellow darken-4"
							disabled={loading}
							style={{ marginRight: '10px' }}
							onClick={loginHandler}
						>
							Войти
						</button>
						<button className="btn grey lighten-1 black-text" disabled={loading} onClick={registerHandler}>
							Регистрация
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
