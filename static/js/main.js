$(document).ready(function () {
    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').html(`<img src="${e.target.result}" width="200" height="200" />`);
                $('.image-section').show();
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        readURL(this);
        $('#result').hide();
    });

    // Predict
    $('#upload-form').submit(function (e) {
        e.preventDefault();

        var formData = new FormData($(this)[0]);

        // Show loading animation
        $('.loader').show();

        // Make prediction by calling api /detect
        $.ajax({
            type: 'POST',
            url: '/detect',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                // Hide loading animation
                $('.loader').hide();

                // Display the result
                $('#result').show().text(`Result: Car Count - ${data.car_count}, Free Count - ${data.free_count}`);
            },
            error: function (xhr, status, error) {
                // Hide loading animation
                $('.loader').hide();

                // Display error message
                $('#result').show().text(`Error: ${error}`);
            }
        });
    });
});
