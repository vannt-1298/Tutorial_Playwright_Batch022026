import { test, expect } from '@playwright/test';

test('TC01 - Todo MVC: Thêm, hoàn thành và xóa công việc', async ({ page }) => {
  // Step 1: Truy cập trang TodoMVC
  await page.goto('https://demo.playwright.dev/todomvc/#/');

  // Step 2: Thêm 3 công việc: Task A, Task B, Task C
  const newTodoInput = page.getByPlaceholder('What needs to be done?');

  await newTodoInput.fill('Task A');
  await newTodoInput.press('Enter');

  await newTodoInput.fill('Task B');
  await newTodoInput.press('Enter');

  await newTodoInput.fill('Task C');
  await newTodoInput.press('Enter');

  // Kiểm tra đã có 3 công việc trong danh sách
  const todoItems = page.getByTestId('todo-item');
  await expect(todoItems).toHaveCount(3);

  // Step 3: Đánh dấu hoàn thành công việc thứ 2 (Task B) - dùng .nth(1)
  await todoItems.nth(1).getByRole('checkbox').check();
  await expect(todoItems.nth(1).getByRole('checkbox')).toBeChecked();

  // Step 4: Kiểm tra công việc đầu tiên là "Task A" - dùng .first()
  await expect(todoItems.first()).toContainText('Task A');

  // Step 5: Tìm công việc có nội dung "Task C" dùng .filter(), hover và xóa
  const taskC = todoItems.filter({ hasText: 'Task C' });
  await expect(taskC).toBeVisible();

  // Di chuột vào để nút Delete (x) hiện ra
  await taskC.hover();

  // Click nút xóa
  await taskC.getByRole('button', { name: 'Delete' }).click();

  // Kiểm tra Task C đã bị xóa, chỉ còn 2 công việc
  await expect(todoItems).toHaveCount(2);
  await expect(page.getByText('Task C')).not.toBeVisible();
});
