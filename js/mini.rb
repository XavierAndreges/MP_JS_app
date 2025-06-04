require "rubygems"
require "uglifier"

r2 = Uglifier.new(:mangle => true).compile(File.read("myScript/script_v1_0.js"))
# => "model minified"

File.open("mini/script_v1_0.js", "w"){|f|
f.write(r2)
}

r2 = Uglifier.new(:mangle => true).compile(File.read("myScript/localisable.js"))
# => "model minified"

File.open("mini/localisable_v1_0.js", "w"){|f|
    f.write(r2)
}