import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('the blog component', () => {
    const note = {
        title: 'Component testing is done',
        likes: 4,
        url: 'https://www.funtube.com/dQw4w9WgXcQ',
        author: 'Bill Clinton',
        user: '232123123123123'
    }

    const user = '323234234234'
    const mockHandler1 = jest.fn()
    const mockHandler2 = jest.fn()

    let container,userE

    beforeEach(() => {
        const utils  = render(<Blog blog={note} increaseHandler={mockHandler1} deleteHandler={mockHandler2} user={user} />)
        container = utils.container
        userE = userEvent.setup()
    })

    describe('renders the content correctly', () => {
        test('shows the title and the author',() => {
            const element1 = screen.findByText('Component testing is done')
            expect(element1).toBeDefined()
            const element2 = screen.findByText('Bill Clinton')
            expect(element2).toBeDefined()
        })
        test('does not show the likes or the url by default',() => {
            const element3 = screen.queryByText('https://www.funtube.com/dQw4w9WgXcQ')
            expect(element3).toBeNull()
            const element4 = container.querySelector('.likeButtonDiv')
            expect(element4).toBeNull()
        })
    })
    describe('works correctly with user input', () => {
        test('clicking the button shows the details',async () => {
            const button = container.querySelector('.showButton')
            await userE.click(button)
            const element3 = screen.queryByText('https://www.funtube.com/dQw4w9WgXcQ')
            expect(element3).toBeDefined()
            const element4 = screen.queryByText('like')
            expect(element4).toBeDefined()
        })
        test('clicking the like twice calls the function twice', async () => {
            const button1 = container.querySelector('.showButton')
            await userE.click(button1)
            const button2 = screen.getByText('like')
            await userE.click(button2)
            await userE.click(button2)
            expect(mockHandler1.mock.calls).toHaveLength(2)
        })
    })
})