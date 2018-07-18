require 'open3'
describe "the program" do
  (1..10).each do |seed|
    context "for seed #{seed}" do
      let(:golden_master) do
        File.read("#{File.expand_path("../golden_master/output-#{seed}.txt", __FILE__)}")
      end

      let(:actual_output) do
        stdout, stderr, status = Open3.capture3("#{File.expand_path('../../bin/run', __FILE__)} #{seed}")
        stdout
      end

      it "produces the same output" do
        expect(actual_output).to eq(golden_master)
      end
    end
  end
end
