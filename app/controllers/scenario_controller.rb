require 'open-uri'
require 'hpricot'
require 'kconv'

JERICHO_URL ="http://jerichof.web.fc2.com/scenari0/"
NISHITETU_URL = "http://jerichof.web.fc2.com/w/memo/"
LAVINA_URL = "http://jerichof.web.fc2.com/scenari0/la_viena/"

class ScenarioController < ApplicationController
  # Basic認証フィルタを対象アクションに指定
  http_basic_authenticate_with :name => 'admin', :password => 'nyanyanya', :only => :top
  http_basic_authenticate_with :name => 'admin', :password => 'nyanyanya', :only => :search
  def top
  end

  def search
    @list = Hash.new()
    @scenario_num = []
    @scenario_list = params[:scenario_list]
    @num = params["num"].to_i
    @men = params["men"].to_i
    @women = params["women"].to_i
    @check = params[:check]
    @unchecked = params[:unchecked]
    @output_num = params[:output_num]
    @keyword = params[:keyword]
    case @scenario_list
    when "jericho941"
      jericho_scenario_search(JERICHO_URL+"top1897347f.htm")
    when "nishitetu"
      nishi_lavina_search(NISHITETU_URL + "itiran_all.htm")
    when "lavina"
      nishi_lavina_search(LAVINA_URL+"all.htm")
    when "news"
      jericho_scenario_search(JERICHO_URL+"news/top.htm")
    else
      scenario_put(JERICHO_URL+"top1897347f.htm")
    end
  end

  def faker
  end

  def fake_page
    url = params[:url]
    Dir::foreach('public/html') {|f|
      if f == "." || f == ".."
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

  def fake
    url = params[:file_url]
    if url.blank?
      flash[:warning] = "URLを入力してください"
      redirect_to action:"faker"
    else
      fake_url = url.split("/").pop
      rand_name = html_edit(url)

      if rand_name 
        redirect_to "/fake_page/#{rand_name}-#{fake_url}"
      else
        redirect_to "/404.html"
      end
    end
  end

  #シナリオ検索
  def jericho_scenario_search(page_url)

    if @men != 0 || @women != 0 || @num != 0
      flg = false
      cnt = 0
      writer = ""

      split_url = page_url.gsub(/#{JERICHO_URL}/,"")
      doc = Hpricot(open(page_url).read)
      case @scenario_list
      when "jericho941"
        contents = doc.to_html.gsub!(/(\w|\.)\n/, '\1')
        contents.gsub!(/href=\"(.*)\"/, "href=\"#{JERICHO_URL}" + '\1' + "\"")
      when "news"
        contents = doc.to_html
        contents = contents.toutf8
        contents.gsub!(/href=\"(.*)\"/, "href=\"#{JERICHO_URL.scrub}news/" + '\1' + "\"")
      end

      if @check == "true"
        pattern = member_pattern(@men, @women, @num)
      end

      contents.lines{|line| 
        if line.toutf8 =~ /.*岡崎二郎.*/ && flg == false || line.toutf8 =~ /HR/i && flg == false
          flg = true
        elsif flg == false
          next
        end
        if line.toutf8 =~ /この台本はヤフー/
          break
        end

        if /<p>.+<\/p>/ =~ line.toutf8
          cnt = cnt + 1
          @scenario_num << cnt
          writer = line.toutf8
          @list[cnt] =[writer, line.toutf8]
          next
        end
        if /\((#{@men}|#{zenhan(@men)})-(#{@women}|#{zenhan(@women)})-(#{@num}|#{zenhan(@num_zen)}")/ =~ line.toutf8 
          if unchecked_check(line.toutf8)
            cnt = cnt + 1
            @scenario_num << cnt
            @list[cnt] =[writer, "<img src='/image/point017_02.gif'>#{line.toutf8.gsub(/\(\d.*\)/, " ")}" , scenario_retio(line.toutf8), member_sum(line.toutf8)]
          end
          next
        end

        if @check == "true"
          #合計人で検索
          if @men == 0 && @women == 0
            if /\((\d*|[０-９]*)-(\d*|[０-９]*)-(\d*|[０-９]*)-(#{@num}|#{zenhan(@num)})\)/ =~ line.toutf8 
              if unchecked_check(line.toutf8)
                @list[cnt] =[writer, "<img src='/image/point018_04.gif'>#{line.toutf8.gsub(/\(\d.*\)/, " ")}" , scenario_retio(line.toutf8), member_sum(line.toutf8)]
              end
            end

            #融通をきかせた比率
          else
            pattern.each{|p|
              if /\(#{(p["men" ])}-#{(p["women"])}-#{(p["num"])}/ =~ line.toutf8 
                if unchecked_check(line.toutf8)
                  cnt = cnt + 1
                  @scenario_num << cnt
                  @list[cnt] =[writer, "<img src='/image/point018_04.gif'>#{line.toutf8.gsub(/\(\d.*\)/, " ")}" , scenario_retio(line.toutf8), member_sum(line.toutf8)]
                end
                break
              end
            }
          end
        end
      }

    else
      scenario_put(page_url)
    end

  end#jericho_scenario_search

  #西鉄,ラヴィーナシナリオ検索
  def nishi_lavina_search(page_url)

    cnt = 0

    if @check == "true"
      pattern = member_pattern(@men, @women, @num)
    end

    case @scenario_list
    when "nishitetu"
      @base_url = NISHITETU_URL
    when "lavina"
      @base_url = LAVINA_URL
    end

    doc = Hpricot(open(page_url).read)
    contents = (doc/:"table/tr") 
    contents.each{|content| 
      line = (content/:"td/p")
      if line[0] == nil
        next
      end
      if html_utf8(line[1]) == "ON-AIR" || html_utf8(line[1]) == "O.A.日"
        next
      else
        if @men != 0 || @women != 0 || @num != 0
          if html_utf8(line[4]).to_i == @men && html_utf8(line[5]).to_i == @women && html_utf8(line[6]).to_i == @num
            if unchecked_check(line)
              cnt = cnt + 1
              @scenario_num << cnt
              @list[cnt] = line
            end
            next
          end

          if @check == "true"
            #合計人数で検索
            if @men == 0 && @women == 0
              if @num == html_utf8(line[7]).to_i
                if unchecked_check(line)
                  cnt = cnt + 1
                  @scenario_num << cnt
                  @list[cnt] = line
                end
              end

              #融通をきかせた比率
            else
              if @men + @women + @num == html_utf8(line[7]).to_i
                pattern.each{|p|
                  if html_utf8(line[4]).to_i == p["men"] && html_utf8(line[5]).to_i == p["women"] && html_utf8(line[6]).to_i == p["num"]
                    if unchecked_check(line)
                      cnt = cnt + 1
                      @scenario_num << cnt
                      @list[cnt] = line
                    end
                    break
                  end
                }
              end
            end
          end
        else
          if unchecked_check(line)
            cnt = cnt + 1
            @scenario_num << cnt
            @list[cnt] = line
          end
        end
      end
    }
  end#nishitetu_scenario_search()

  #融通を聞かせた時のパターン
  def member_pattern(men, women, num)

    pattern = []
    pattern << {
      "men" => men,
      "women" => women,
      "num" => num
      } 

    (1..num).each{|i|
      pattern << { 
        "men" => men + i,
        "women" => women,
        "num" => num - i
      } 

      pattern << { 
        "men" => men,
        "women" => women + i,
        "num" => num - i
      } 
    }

    num2 = num
    m_men = men + num
    m_women = women
    w_men = men
    w_women = women + num

    while(num2 > 0)
      if m_men > men 
        m_men = m_men - 1
        m_women = m_women + 1

        if pattern_check(pattern, m_men, m_women, num - num2)
          pattern << { 
            "men" => m_men,
            "women" => m_women,
            "num" => num - num2
          } 
        end
      end
      if w_women > women
        w_men = w_men + 1
        w_women = w_women - 1

        if pattern_check(pattern, w_men, w_women, num - num2)
          pattern << { 
            "men" => w_men,
            "women" => w_women,
            "num" => num - num2
          }
        end
      end
      if w_women <= women && m_men <= men
        num2 = num2 - 1
        m_men = men + num2
        m_women = women
        w_men = men
        w_women = women + num2
      end
    end

    (1..men).each{|m|
      if pattern_check(pattern, w_men, w_women, num - num2)
        pattern << { 
          "men" => men - m,
          "women" => women,
          "num" => num + m
        } 
      end
      (1..women).each{|w|
        if pattern_check(pattern, w_men, w_women, num - num2)
          pattern << { 
            "men" => men - m,
            "women" => women - w,
            "num" => num + m + w 
          } 
        end
      }
    }
    (1..women).each{|w|
      if pattern_check(pattern, w_men, w_women, num - num2)
          pattern << { 
            "men" => men,
            "women" => women - w,
            "num" => num + w
          } 
      end
    }

    return(pattern)

  end#member_pattern()

  def pattern_check(pattern, men, women, num)
    pattern.each{|p|
      if p["men"] == men && p["women"] == women && p["num"] == num
        return true
      end
    }
    return false 
  end

  def scenario_retio(title)

    /\((\d*|[０-９]*)-(\d*|[０-９]*)-(\d*|[０-９]*)/ =~ title
    retio = "<font color=\"blue\">#{$1.to_s}</font>:<font color=\"#DF01D7\">#{$2.to_s}</font>:#{$3.to_s}"
    return(retio)

  end

  def member_sum(title)
    /\((\d*|[０-９]*)-(\d*|[０-９]*)-(\d*|[０-９]*)/ =~ title
    sum = $1.to_i + $2.to_i + $3.to_i
    return(sum)

  end

  def unchecked_check(title)
    case @unchecked
    when "checked"
      if title =~ /^・/
        return false
      end
    when "unchecked"
      unless title =~ /^・/
        return false
      end
    end
      return true
  end

  def zenhan(str)
    return(str.to_s.tr!("0-9", "０-９"))
  end

  #全シナリオ出力
  def scenario_put(page_url)
    flg = false
    cnt = 0
    writer = ""

    split_url = page_url.gsub(/#{JERICHO_URL}/,"")
    doc = Hpricot(open(page_url).read)
    if @scenario_list == "news"
      contents = doc.to_html
      contents = contents.toutf8
      contents.gsub!(/href=\"(.*)\"/, "href=\"#{JERICHO_URL.scrub}news/" + '\1' + "\"")
    else
      contents = doc.to_html.gsub!(/(\w|\.)\n/, '\1')
      contents.gsub!(/href=\"(.*)\"/, "href=\"#{JERICHO_URL}" + '\1' + "\"")
    end

    contents.lines{|line| 
      if line.toutf8 =~ /.*岡崎二郎.*/ && flg == false  || line.toutf8 =~ /HR/i && flg == false && @scenario_list == "news"
        flg = true
      elsif flg == false
        next
      end
      if line.toutf8 =~ /この台本はヤフー/
        break
      end
      if /<p>.+<\/p>/ =~ line.toutf8
        cnt = cnt + 1
        @scenario_num << cnt
        writer = line.toutf8
        @list[cnt] = [writer, line.toutf8]
      elsif line.toutf8 =~ /\(\d.*\)/ 
        if unchecked_check(line.toutf8)
          cnt = cnt + 1
          @scenario_num << cnt
          @list[cnt] = [writer, line.toutf8.gsub(/\(\d.*\)/, "") , scenario_retio(line.toutf8), member_sum(line.toutf8)]
        end
      end
    }

  end#scenario_put

  def html_utf8(elem)
    return(elem.inner_html.toutf8)
  end#html_utf8

  #####fake htmlの作成・更新#####
  def html_edit(url)
    name = rand(100) + 1
    if url != ""
      begin 
        doc = Hpricot(open(url).read)
      rescue
        return false
      end
      
      File::open("public/html/#{name}-#{url.split("/").pop}", 'w') do |file|
        file.puts(doc)
      end
    end
    return name
  end #html_edit()
end
