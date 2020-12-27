let crud = new function () {

    // An array of JSON objects with values.
    this.myNotes = [
        {
            id: 1,
            title: "Test Note 1",
            priority: "medium",
            status: "waiting",
            date: "15-01-2021 12:30",
            details: "",
        },
        {
            id: 2,
            title: "Test Note 2",
            priority: "critical",
            status: "finished",
            date: "20-01-2021 09:30",
            details: "Test Note 2 Details",
        },
        {
            id: 3,
            title: "Test Note 3",
            priority: "low",
            status: "scheduled",
            date: "30-01-2021 17:45",
            details: "Test Note 3 Details",
        },
        {
            id: 4,
            title: "Test Note 4",
            priority: "medium",
            status: "finished",
            date: "02-01-2021 18:00",
            details: "Test Note 4 Details",
        },
        {
            id: 5,
            title: "Test Note 5",
            priority: "low",
            status: "in_progress",
            date: "22-02-2021 14:10",
            details: "Test Note 5 Details",
        },
        {
            id: 6,
            title: "Test Note 6",
            priority: "high",
            status: "scheduled",
            date: "05-03-2021 20:50",
            details: "Test Note 6 Details",
        },
        {
            id: 7,
            title: "Test Note 7",
            priority: "low",
            status: "finished",
            date: "05-01-2021 00:00",
            details: "Test Note 7 Details",
        },
        {
            id: 8,
            title: "Test Note 8",
            priority: "medium",
            status: "in_progress",
            date: "07-01-2021 09:00",
            details: "Test Note 8 Details",
        },
        {
            id: 9,
            title: "Test Note 9",
            priority: "high",
            status: "waiting",
            date: "08-01-2021 12:45",
            details: "Test Note 9 Details",
        },
        {
            id: 10,
            title: "Test Note 10",
            priority: "critical",
            status: "finished",
            date: "17-01-2021 21:00",
            details: "Test Note 10 Details",
        }
    ];

    // Allowed Priority Values
    this.priorityList = ['low', 'medium', 'high', 'critical'];

    // Allowed Status Values
    this.statusList = ['in_progress', 'scheduled', 'waiting', 'finished'];

    // Creates / Refresh the board
    this.createTable = function () {

        // Clear the Board
        this.emptyBoard();

        for (let i = this.myNotes.length - 1; i > 0; i--) {
            const json = this.myNotes[i];
            switch (json.status) {
                case "in_progress":
                    $('#inProgressList').append(makeCard(json));
                    break;
                case "scheduled":
                    $('#scheduledList').append(makeCard(json));
                    break;
                case "waiting":
                    $('#waitingList').append(makeCard(json));
                    break;
                case "finished":
                    $('#finishedList').append(makeCard(json));
                    break;
                default:
                    throw Error;
            }
        }
    };

    // Clear the Board
    this.emptyBoard = function () {
        $('#inProgressList').empty();
        $('#scheduledList').empty();
        $('#waitingList').empty();
        $('#finishedList').empty();
    }

    // Validate Input
    this.inputValidator = function (id) {

        // Create Note Object
        let obj = {};

        // Validate id
        obj.id = (id >= 0) ? id : this.myNotes.length + 1;

        // Validate title
        const val = $('#title').val().trim();
        obj.title = (val !== '') ? val : 'No Name Note';

        // Validate priority
        const priority = $('#priority').val();
        obj.priority = this.priorityList.includes(priority) ? priority : 'medium';

        // Validate status
        const status = $('#status').val();
        obj.status = this.statusList.includes(status) ? status : 'in_progress';

        // Validate date
        obj.date = $('#date').val().trim();

        // Validate details
        obj.details = $('#details').val().trim();

        return obj;
    }

    // Preparation for Create New Modal
    this.createPreparation = function () {
        $('#noteModalLabel').html('Create Note');

        document.getElementById('form').reset();
        $('.selectpicker').selectpicker('refresh');

        $('#submitBtn').attr('onclick', 'crud.create()');
    };

    // Create Note
    this.create = function () {

        // Create Note Object and Add to the List
        let obj = this.inputValidator(-1);
        this.myNotes.push(obj);

        // Reload Lists
        this.createTable();
        this.success('The Note has been created successfully');
    };

    // Edit Note.
    this.edit = function (id) {
        // Find Object and Populate Fields
        for (let i = 0; i < this.myNotes.length; i++) {
            const cur = this.myNotes[i];
            if (cur.id === id) {
                $('#noteModalLabel').html('Edit Note #' + cur.id);

                $('#title').val(cur.title);
                $('#priority').val(cur.priority);
                $('#status').val(cur.status);
                $('#date').val(cur.date);
                $('#details').val(cur.details);
                $('.selectpicker').selectpicker('refresh');

                $('#submitBtn').attr('onclick', 'crud.update(' + cur.id + ')');

                break;
            }
        }
    };

    // Update Note
    this.update = function (id) {

        // Find and Update Note
        for (let i = 0; i < this.myNotes.length; i++) {
            if (this.myNotes[i].id === id) {
                this.myNotes[i] = this.inputValidator(id);
                break;
            }
        }

        // Reload Lists
        this.createTable();
        this.success('The Note has been updated successfully');
    };

    // Update Note
    this.finish = function (id) {

        // Find and Update Note
        for (let i = 0; i < this.myNotes.length; i++) {
            if (this.myNotes[i].id === id) {
                this.myNotes[i].status = 'finished';
                break;
            }
        }

        // Reload Lists
        this.createTable();
        this.success('The Note has been finished successfully');
    };


    // Delete Note
    this.delete = function (id) {

        // Confirm Deletion
        Swal.fire({
            title: 'Are you sure?',
            text: 'Note #' + id + " is about to be deleted! You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            padding: '2em',
            timer: 5000,
            timerProgressBar: true,
        }).then(function (result) {
            if (result.value) {
                // Find and Delete Note
                for (let i = 0; i < crud.myNotes.length; i++) {
                    if (crud.myNotes[i].id === id) {
                        crud.myNotes.splice(i, 1);
                        break;
                    }
                }

                // Reload Lists
                crud.createTable();
                crud.success('The Note has been deleted successfully');
            }
        })
    };

    // Success Message
    this.success = function (response) {
        Snackbar.show({
            text: response,
            alertScreenReader: true,
            showAction: false,
            duration: 3000,
        });
    }

}

crud.createTable();