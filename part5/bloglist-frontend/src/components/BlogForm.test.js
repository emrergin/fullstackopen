import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('the form component', () => {
    test('<BlogForm /> updates parent state and calls onSubmit', async () => {
        const addBlog = jest.fn()
        const user = userEvent.setup()

        const { container } = render(<BlogForm addBlog={addBlog} />)

        const inputTitle = container.querySelector('#titleBox')
        const inputAuthor = container.querySelector('#authorBox')
        const inputUrl = container.querySelector('#urlBox')

        const sendButton = screen.getByText('create')

        await user.type(inputTitle, 'Küçük Kadınlar' )
        await user.type(inputAuthor, 'Kemalettin Tuğcu' )
        await user.type(inputUrl, 'https://fullstackopen.com/en/part5/testing_react_apps#testing-the-forms' )
        await user.click(sendButton)

        expect(addBlog.mock.calls).toHaveLength(1)
        expect(addBlog.mock.calls[0][1]).toBe('Küçük Kadınlar' )
        expect(addBlog.mock.calls[0][2]).toBe('https://fullstackopen.com/en/part5/testing_react_apps#testing-the-forms' )
        expect(addBlog.mock.calls[0][3]).toBe('Kemalettin Tuğcu' )
    })
})