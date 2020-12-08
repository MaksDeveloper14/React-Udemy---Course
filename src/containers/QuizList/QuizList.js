import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import classes from './QuizList.css';

export default class QuizList extends Component {
	renderQuizes() {
		return [1,2,3].map((quiz,index)=> {
			return (
				<NavLink to={'/quiz/' + quiz}>
					<li key={index}>
						Тест {quiz}
					</li>
				</NavLink>
			)
		})
	}

	render() {
		return (
			<div className={classes.QuizList}>
			  <div>
					<h1>Список тестов</h1>
					<ul>
						{this.renderQuizes()}
					</ul>
				</div>
			</div>
		)
	}
}