require "test_helper"

class MixerControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get mixer_index_url
    assert_response :success
  end
end
