module TexshareHelper
require 'kconv'
  def html_utf8(elem)
    return(elem.inner_html.toutf8)
  end#html_utf8
end
