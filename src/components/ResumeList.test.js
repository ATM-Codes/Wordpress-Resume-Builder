import { render, screen, fireEvent } from '@testing-library/react';
import ResumeList from './ResumeList.js';

const resumes = [
	{ id: 1, title: 'Bob CV', modified: '2026-11-20T10:00:00+00:00' },
	{ id: 2, title: 'Carol CV', modified: null },
];

describe( 'ResumeList', () => {
	it( 'calls onDelete with the resume id when Delete is clicked', () => {
		const onDelete = jest.fn();
		render(
			<ResumeList
				resumes={ resumes }
				onSelect={ jest.fn() }
				onDelete={ onDelete }
				onExport={ jest.fn() }
			/>
		);

		fireEvent.click( screen.getByRole( 'button', { name: 'Delete Carol CV' } ) );

		expect( onDelete ).toHaveBeenCalledWith( 2 );
	} );

    it( 'Renders one row per resume', () => {
		render(
			<ResumeList
				resumes={ resumes }
				onSelect={ jest.fn() }
				onDelete={ jest.fn()}
				onExport={ jest.fn() }
			/>
		);

		expect(screen.getAllByRole('listitem')).toHaveLength(2);
	} );

    it( 'Calls onSelect when the CV\'s edit button is clicked', () => {
		const onSelect = jest.fn();
		render(
			<ResumeList
				resumes={ resumes }
				onSelect={ onSelect }
				onDelete={ jest.fn() }
				onExport={ jest.fn() }
			/>
		);

		fireEvent.click(screen.getByRole('button', { name: 'Edit Bob CV' } ));

		expect( onSelect ).toHaveBeenCalledWith(1);
	} );

} );