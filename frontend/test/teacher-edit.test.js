import {Selector} from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Teacher UI`
    .page`http://localhost:4401/`
    test('Testing edit teachers', async t => {
        await t.navigateTo("/");
        await t.click("#teacher-edit-10003");
    
        await t.typeText("#teacher-name", "Changed Teacher Name", { replace: true });
        await t.typeText("#teacher-age", "99", { replace: true });
        await t.click("#teacher-edit");
    
        // Wait for the update operation to complete and UI to refresh
        await t.wait(1000); // Adjust the waiting time as needed
    
        await t.navigateTo("/");
    
        // Check the entire table content for debugging
        const tableContent = await Selector('#teacher-table').innerText;
        console.log(tableContent);
    
        // Adjust this selector based on the actual DOM structure
        const editedTeacherSelector = Selector('td').withText('10003').parent('tr');
        const editedTeacherRow = await editedTeacherSelector.innerText;
    
        await t.expect(editedTeacherRow).contains("Changed Teacher Name");
    
        await t.click("#teacher-delete-10003");
    });
    
    
