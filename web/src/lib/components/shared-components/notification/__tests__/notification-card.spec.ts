import NotificationComponentTest from '$lib/components/shared-components/notification/__tests__/notification-component-test.svelte';
import '@testing-library/jest-dom';
import { cleanup, render, type RenderResult } from '@testing-library/svelte';
import { NotificationType } from '../notification';
import NotificationCard from '../notification-card.svelte';

describe('NotificationCard component', () => {
  let sut: RenderResult<NotificationCard>;

  it('disposes timeout if already removed from the DOM', () => {
    vi.spyOn(window, 'clearTimeout');

    sut = render(NotificationCard, {
      notification: {
        id: 1234,
        message: 'Notification message',
        timeout: 1000,
        type: NotificationType.Info,
        action: { type: 'discard' },
      },
    });

    cleanup();
    expect(window.clearTimeout).toHaveBeenCalledTimes(1);
  });

  it('shows message and title', () => {
    sut = render(NotificationCard, {
      notification: {
        id: 1234,
        message: 'Notification message',
        timeout: 1000,
        type: NotificationType.Info,
        action: { type: 'discard' },
      },
    });

    expect(sut.getByTestId('title')).toHaveTextContent('info');
    expect(sut.getByTestId('message')).toHaveTextContent('Notification message');
  });

  it('shows title and renders component', () => {
    sut = render(NotificationCard, {
      notification: {
        id: 1234,
        type: NotificationType.Info,
        timeout: 1,
        action: { type: 'discard' },
        component: {
          type: NotificationComponentTest,
          props: {
            href: 'link',
          },
        },
      },
    });

    expect(sut.getByTestId('title')).toHaveTextContent('info');
    expect(sut.getByTestId('message').innerHTML).toEqual('Notification <b>message</b> with <a href="link">link</a>');
  });
});
