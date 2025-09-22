from main import BoxCalculator


def test_field_access_initializes_correctly():
    """Test that the box fields are set correctly."""
    box = BoxCalculator(1, 2, 3)
    assert box.length == 1
    assert box.width == 2
    assert box.height == 3


def test_boxes_with_different_dimensions_are_not_equal():
    """Test that boxes with different dimensions are not considered equal."""
    box1 = BoxCalculator(1, 2, 3)
    box2 = BoxCalculator(2, 3, 4)
    assert box1 != box2


def test_two_boxes_with_same_dimensions_are_different_instances():
    """Test that two boxes with the same dimensions are not the same object."""
    box1 = BoxCalculator(1, 2, 3)
    box2 = BoxCalculator(1, 2, 3)
    
    # Ensure different instances
    assert box1 is not box2
    
    # Optionally, check for value equality if __eq__ is implemented
    assert box1 == box2  # only if __eq__ is defined for value comparison


def test_volume_is_calculated_correctly():
    """Test the volume calculation."""
    box = BoxCalculator(2, 3, 4)
    assert box.calculate_volume() == 24
