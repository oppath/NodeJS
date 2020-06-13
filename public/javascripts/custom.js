$(document).ready(function () {
  /**
  * Category Add Form Validation
  */
  $('#categoryForm').validate({
    rules: {
      title: {
        required: true,
        minlength: 2
      },
      status: {
        required: true
      },
    },
    messages: {
      title: {
        required: "Please enter a category name",
        minlength: "Your category name must be at least 2 characters long"
      },
      status: "Please select status"
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    }
  });

  /**
  * Product Add Form Validation
  */
  $('#productForm').validate({
    rules: {
      category: {
        required: true
      },
      title: {
        required: true,
        minlength: 2
      },
      price: {
        required: true,
      },
      image: {
        required: true
      },
      status: {
        required: true
      },
    },
    messages: {
      category: "Please select category",
      title: {
        required: "Please enter a product name",
        minlength: "Your product name must be at least 2 characters long"
      },
      price: "Please enter price",
      image: "Please upload image",
      status: "Please select status"
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    }
  });
  /**
    * Product Edit Form Validation
    */
  $('#productEditForm').validate({
    rules: {
      category: {
        required: true
      },
      title: {
        required: true,
        minlength: 2
      },
      price: {
        required: true,
      },
      status: {
        required: true
      },
    },
    messages: {
      category: "Please select category",
      title: {
        required: "Please enter a product name",
        minlength: "Your product name must be at least 2 characters long"
      },
      price: "Please enter price",
      status: "Please select status"
    },
    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    }
  });
  /**
 * Data table config for listing
 */
  $(function () {
    $('#listing').DataTable({
      "paging": true,
      "lengthChange": false,
      "searching": true,
      "ordering": true,
      "info": true,
      "autoWidth": false,
      "responsive": true,
    });
  });
});
