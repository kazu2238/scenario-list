class TexshareController < ApplicationController
  def top
  end

  def share
  end

  def page
    url = params[:url]
    Dir::foreach('public/html') {|f|
      if f == "." || f == ".." || f == ".keep"
        next
      end
      if File.mtime("public/html/#{f}") < Time.now - 36000 * 3 
        File.unlink("public/html/#{f}")
      end
    }
    if File.exist?("public/html/#{url}")
      @html = File.read("public/html/#{url}").toutf8
    else
      redirect_to "/404.html"
    end
  end

  def upload
    data = CGI.escapeHTML(params[:text].force_encoding("utf-8")).gsub(/(\n\r|\n)/, "<br>")
    title = params[:title]
    name = params[:name]

    if data.blank?
      return false
    else
      rand_name = html_edit(data,title,name)

      if rand_name 
        render name: rand_name
      else
        render name: false
      end
    end
  end

  ##### htmlの作成 #####
  def html_edit(data,title,name)
    if data != ""
      File::open("public/html/#{name}", 'w') do |file|
        file.puts("<title>#{title}</title>");
        file.puts(data)
      end
    else
      return false
    end
    return name
  end #html_edit()
end
