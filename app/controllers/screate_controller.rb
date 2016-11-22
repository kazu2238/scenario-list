class ScreateController < ApplicationController

  def top
    text = params["text"]
    unless text.blank?
      @html_text = create(text)
    end
  end

  def create(text)
    names = params["name"]
    colors = params["color"]

    #文字色のスタイルシート作成
    table_text = "\n<style>\n"
    colors.each{|c|
      if colors[c.first] =~ /#000000/
        colors.delete(c.first)
      else
        table_text += ".color-#{c.first}{\n\tcolor:#{c[1]};\n}\n"
      end
      if names[c.first] == ""
        names.delete(c.first)
      end
    }
    table_text += "</style>\n"

    #配役入力欄作成
    table_text += "\n<textarea cols='50' rows='#{names.length + 2}' name=h'aiyaku'>\n"
    names.each{|n|
      table_text += "#{n[1]}：\n"
    }
    table_text += "\n</textarea><br>\n<br>\n"

    #テーブル作成
    table_text += "\n<table border='1'>\n"
    br_flag = false
    color_flag = false

    line_cnt = 1
    text.lines{|t|
      t = t.gsub(/\R/, "")
      if br_flag
        table_text += "\t\t" + t.gsub(/\"/, "")
        if t =~ /\"/ 
          br_flag = false
          table_text += "</td>\n\t</tr>\n"
        else
          #セル内改行
          table_text += "<br>\n"
        end
      else
        
        if t =~ /^\t/ 
          table_text += "\t<tr>\n\t\t<td></td>\n"
        else
          table_text += "\t<tr>\n\t\t<td>#{sprintf("%03d",line_cnt)}</td>\n"
          line_cnt += 1
        end
        names.each{|n|
          if t =~ /^#{names[n.first]}/ || t =~ /\t#{names[n.first]}\t/ || t =~ /\t#{names[n.first]}M\t/ || t =~ /\t#{names[n.first]}N\t/
            color_flag = true
            table_text += tab_to_td(t, n.first)
            break
          end
        }
        unless color_flag
          table_text += tab_to_td(t)
        end
        color_flag = false
        if t =~ /\"/ 
          #セル内がある時
          table_text += "<br>\n"
          br_flag = true
        else
          table_text += "</td>\n\t</tr>\n"
        end
      end

    }
    table_text += "</table>"

    return table_text
  end

  def tab_to_td(line, color = nil)
    change_text = ""
    if color
      change_text = "\t\t<td class='color-#{color}'>"
      change_text += line.gsub(/\t/, "</td>\n\t\t<td class='color-#{color}'>")
    else
      change_text = "\t\t<td>"
      change_text += line.gsub(/\t/, "</td>\n\t\t<td>")
    end
    change_text = change_text.gsub(/\"/, "")

    return change_text
  end

end
