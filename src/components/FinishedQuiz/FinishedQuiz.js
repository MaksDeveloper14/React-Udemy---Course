import React, {Component} from 'react';
// Это объект с классами из файла FinishedQuiz.css
import classes from './FinishedQuiz.css';
import Button from '../UI/Button/Button.js';
import {Link} from 'react-router-dom';

// Возвращаем список ответов, показывая правильные и неправильные

const FinishedQuiz = props => {
	const successCount = Object.keys(props.results).reduce((total, key)=>{
		if(props.results[key] === 'success') {
			total++;
		}
		return total;
	}, 0)

	return (
		<div className={classes.FinishedQuiz}>
			<ul>
				{props.quiz.map((quizItem, index) => {
					const cls = [
						'fa',
						// проверку тернарным оператором можно делать даже в массиве
						props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
						classes[props.results[quizItem.id]]
					]
					return (
						<li 
							key={index}
						>
							<strong>{index + 1}</strong>. &nbsp;
							{quizItem.question}
							<i className={cls.join(' ')} />
						</li>
					)
				})} 
			</ul>
			<p>Правильно {successCount} из {props.quiz.length}</p>
			<Button onClick={props.onRetry} type="primary">Повторить</Button>
			<Link to="/">
				<Button type="success">Перейти в список тестов</Button>
			</Link>		
		</div>
	)
}

// Экспортируем наружу
export default FinishedQuiz;